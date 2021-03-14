import 'reflect-metadata';
import {InversifyExpressServer} from 'inversify-express-utils';
import {Container} from 'inversify';
import {makeLoggerMiddleware} from 'inversify-logger-middleware';
import * as bodyParser from 'body-parser';
import TYPES from './constant/types';
import {UserService} from './service/UserService';
import {MongoDBClient} from './utils/mongodb/client';
import './controller/home';
import './controller/UserController';
import {User} from './models/user';
import {UserController} from './controller/UserController';
import {MessageService} from './service/MessageService';
import {TwitterClient} from './service/TwitterClient';
import {MessageController} from './controller/MessageController';

// load everything needed to the Container
let container = new Container();

if (process.env.NODE_ENV === 'development') {
  let logger = makeLoggerMiddleware();
  container.applyMiddleware(logger);
}


container.bind<MongoDBClient<User>>(TYPES.UserService).to(UserService).whenInjectedInto(UserController);
container.bind<TwitterClient>(TYPES.TwitterClient).to(TwitterClient).whenInjectedInto(MessageService);
container.bind<MessageService>(TYPES.MessageService).to(MessageService).inSingletonScope().whenInjectedInto(MessageController);
// container.bind<UserService>(TYPES.UserService).to(UserService);

// start the server
let server = new InversifyExpressServer(container);
server.setConfig((application) => {
  application.use(bodyParser.urlencoded({
    extended: true
  }));
  application.use(bodyParser.json());
  // application.use(helmet());
});

let app = server.build();
app.listen(3000);
console.log('Server started on port 3000 :)');

exports = module.exports = app;
