import {Db, ObjectID} from 'mongodb';
import {injectable, unmanaged} from 'inversify';
import {MongoDBConnection} from './connection';

@injectable()
export class MongoDBClient<T> {
    public db: Db;

    private static result(err, res: any, resolve, reject): any {
        if (err) {
            reject(err);
        } else {
            resolve(res);
        }

    }

    constructor(@unmanaged() private collection: { new(...args: any[]): T; }) {
        MongoDBConnection.getConnection((connection) => {
            this.db = connection;
        });
    }

    public find(filter: Object = {}, {skip = 0, limit = 0, key, order = 1}:
        { skip?: number, limit?: number, key?: string, order?: 1 | -1 } = {skip: 0, limit: 0, order: 1}) {
        return new Promise<T[]>((resolve, reject) => {
            this.db.collection(this.collection.name.toLowerCase())
                .find(filter)
                .skip(skip)
                .limit(limit)
                .sort(key && {[key]: order})
                .toArray((error, find) => {
                    MongoDBClient.result(error, find, resolve, reject);
                });
        });
    }

    public findOneById(objectId: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.db.collection(this.collection.name.toLowerCase()).find({_id: new ObjectID(objectId)}).limit(1).toArray((error, find) => {
                MongoDBClient.result(error, find[0], resolve, reject);
            });
        });
    }

    public insert(model: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.db.collection(this.collection.name.toLowerCase()).insertOne(model, (error, insert) => {
                MongoDBClient.result(error, model, resolve, reject);
            });
        });
    }

    public update(objectId: string, model: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.db.collection(this.collection.name.toLowerCase()).updateOne(
                {_id: new ObjectID(objectId)},
                {$set: model},
                (error, update) => MongoDBClient.result(error, model, resolve, reject).bind(this)
            );
        });
    }

    public remove(objectId: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.db.collection(this.collection.name.toLowerCase()).deleteOne({_id: new ObjectID(objectId)}, (error, remove) => {
                MongoDBClient.result(error, remove, resolve, reject);
            });
        });
    }

}
