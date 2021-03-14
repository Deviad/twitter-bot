import {injectable} from 'inversify';
import {MongoDBClient} from '../utils/mongodb/client';
import {SentMessage} from '../eventstore/sentMessage';

@injectable()
export class SentMessageRepository extends MongoDBClient<SentMessage> {
  // private mongoClient: MongoDBClient;
  constructor() {
    super(SentMessage);
  }
}
