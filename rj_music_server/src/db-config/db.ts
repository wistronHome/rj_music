/**
 * Created by GyjLoveLh on  2018/2/9
 */
import * as mongoose from 'mongoose';

const mongoConfig = "mongodb://localhost/rj_music";

export class Db {
    private static _instance: Db = null;

    public static getInstance(): Db {
        if (!Db._instance) {
            Db._instance = new Db();
        }
        return Db._instance;
    }

    public getConnection() {
        let promise = mongoose.createConnection(mongoConfig, {
            useMongoClient: true
        });
        promise.then(result => {
            console.log('>>>>>>>>  ' + mongoConfig + '  <<<<<<<<< connect suceess');
        });

        return promise;
    }
}
