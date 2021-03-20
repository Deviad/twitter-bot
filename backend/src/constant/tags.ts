const TAGS = {
    MessageService: Symbol.for('MessageService'),
    MessageServiceScheduleHandler: Symbol.for('MessageServiceScheduleHandler'),
    MongoDBClient: Symbol.for('MongoDBClient'),
    ScheduledMessageRepository: Symbol.for('ScheduledMessageRepository'),
    SentMessageRepository: Symbol.for('SentMessageRepository'),
    TokenVerifier: Symbol.for('TokenVerifier'),
    TwitterClient: Symbol.for('TwitterClient'),
    UserService: Symbol.for('UserService')


};

export default TAGS;
