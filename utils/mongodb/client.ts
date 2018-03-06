import { Db, ObjectID } from 'mongodb';
import {injectable, unmanaged} from 'inversify';
import { MongoDBConnection } from './connection';

@injectable()
export class MongoDBClient<T> {
  public db: Db;
  constructor(@unmanaged() private collection: { new (...args: any[]): T; }) {
      MongoDBConnection.getConnection((connection) => {
          this.db = connection;
        });
  }

  public find(filter: Object = {}) {
      return new Promise<T[]>((resolve, reject) => {
          this.db.collection(this.collection.name.toLowerCase()).find(filter).toArray((error, find) => {
            this.result(error, find, resolve, reject);
          });
      });
  }

  public findOneById(objectId: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        this.db.collection(this.collection.name.toLowerCase()).find({_id: new ObjectID(objectId)}).limit(1).toArray((error, find) => {
          this.result(error, find[0], resolve, reject);
        });
    });
  }

  public insert(model: T): Promise<T> {
      return new Promise<T>((resolve, reject) => {
          this.db.collection(this.collection.name.toLowerCase()).insertOne(model, (error, insert) => {
            this.result(error, model, resolve, reject);
          });
      });
  }

  public update(objectId: string, model: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.db.collection(this.collection.name.toLowerCase()).updateOne(
        { _id: new ObjectID(objectId) },
        { $set: model },
        (error, update) => this.result(error, model, resolve, reject).bind(this)
      );
    });
  }

  public remove(objectId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db.collection(this.collection.name.toLowerCase()).deleteOne({ _id: new ObjectID(objectId) }, (error, remove) => {
         (this.result(error, remove, resolve, reject));
      });
    });
  }

  private result(err, res: any, resolve, reject ): any {
    if (err) {
        reject(err);
    }
     resolve(res);
  }
}
