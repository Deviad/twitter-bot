import {injectable} from 'inversify';
import { MongoDBClient } from '../utils/mongodb/client';
import { User } from '../models/user';

@injectable()
export class UserService extends MongoDBClient<User> {
  // private mongoClient: MongoDBClient;
     constructor() {
         super(User);
     }
}
