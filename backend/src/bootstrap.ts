import 'reflect-metadata';
import {InversifyExpressServer} from 'inversify-express-utils';
import {Container} from 'inversify';
import {makeLoggerMiddleware} from 'inversify-logger-middleware';
import * as bodyParser from 'body-parser';
import cors from 'cors';
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
import {MessageServiceScheduleHandler} from './service/MessageServiceScheduleHandler';
import {TokenVerifier} from './service/TokenVerifier';


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
    .bind<MessageServiceScheduleHandler>(TAGS.MessageServiceScheduleHandler)
    .to(MessageServiceScheduleHandler).whenInjectedInto(MessageService);


container
    .bind<MongoDBClient<ScheduledMessage>>(TAGS.ScheduledMessageRepository)
    .to(ScheduledMessageRepository).whenInjectedInto(MessageServiceScheduleHandler);
container
    .bind<MongoDBClient<SentMessage>>(TAGS.SentMessageRepository)
    .to(SentMessageRepository).whenInjectedInto(MessageServiceScheduleHandler);

container
    .bind<TwitterClient>(TAGS.TwitterClient)
    .to(TwitterClient).inSingletonScope().whenInjectedInto(MessageServiceScheduleHandler);


container
    .bind<MessageService>(TAGS.MessageService)
    .to(MessageService).whenInjectedInto(MessageController);

container
    .bind<TokenVerifier>(TAGS.TokenVerifier)
    .to(TokenVerifier).whenInjectedInto(MessageService);

// container.bind<UserService>(TYPES.UserService).to(UserService);

// start the server
let server = new InversifyExpressServer(container);
server.setConfig((application) => {
    application.use(cors());
    application.use(bodyParser.urlencoded({
        extended: true
    }));
    application.use(bodyParser.json());
    // application.use(helmet());
});

let app = server.build();
app.listen(3001);
console.log('Server started on port 3001 :)');

exports = module.exports = app;


