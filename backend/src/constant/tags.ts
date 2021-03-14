const TAGS = {
    MessageService: Symbol.for('MessageService'),
    TwitterClient: Symbol.for('TwitterClient'),
    ScheduledMessageRepository: Symbol.for('ScheduledMessageRepository'),
    SentMessageRepository: Symbol.for('SentMessageRepository'),
    MongoDBClient: Symbol.for('MongoDBClient'),
    UserService: Symbol.for('UserService'),
};

export default TAGS;
