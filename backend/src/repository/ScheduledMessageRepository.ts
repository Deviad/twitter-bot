import {injectable} from 'inversify';
import {MongoDBClient} from '../utils/mongodb/client';
import {ScheduledMessage} from '../eventstore/scheduledMessage';

@injectable()
export class ScheduledMessageRepository extends MongoDBClient<ScheduledMessage> {
  // private mongoClient: MongoDBClient;
  constructor() {
    super(ScheduledMessage);
  }
}
