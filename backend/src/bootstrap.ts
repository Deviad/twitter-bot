import 'reflect-metadata';
import {InversifyExpressServer} from 'inversify-express-utils';
import {Container} from 'inversify';
import {makeLoggerMiddleware} from 'inversify-logger-middleware';
import * as bodyParser from 'body-parser';
import TAGS from './constant/tags';
import './controller/home';
import './controller/UserController';
// import {User} from './eventstore/user';
// import {UserController} from './controller/UserController';
import {MessageService} from './service/MessageService';
import {TwitterClient} from './service/TwitterClient';
import {MessageController} from './controller/MessageController';
import {MongoDBClient} from './utils/mongodb/client';
import {ScheduledMessage} from './eventstore/scheduledMessage';
import {ScheduledMessageRepository} from './repository/ScheduledMessageRepository';
import {SentMessageRepository} from './repository/SentMessageRepository';
import {SentMessage} from './eventstore/sentMessage';

// load everything needed to the Container
let container = new Container();

if (process.env.NODE_ENV === 'development') {
  let logger = makeLoggerMiddleware();
  container.applyMiddleware(logger);
}


container
  .bind<MongoDBClient<ScheduledMessage>>(TAGS.ScheduledMessageRepository)
  .to(ScheduledMessageRepository).whenInjectedInto(MessageService);
container
  .bind<MongoDBClient<SentMessage>>(TAGS.SentMessageRepository)
  .to(SentMessageRepository).whenInjectedInto(MessageService);

container
  .bind<TwitterClient>(TAGS.TwitterClient)
  .to(TwitterClient).whenInjectedInto(MessageService);
container
  .bind<MessageService>(TAGS.MessageService)
  .to(MessageService).inSingletonScope().whenInjectedInto(MessageController);
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
