/**
 * Created by GyjLoveLh on  2018/2/9
 */
import * as mongoose from 'mongoose';

const mongoConfig = "mongodb://localhost/rj_music";

export class Db {
    private static _instance: Db = null;
    private _conn = null;
    public static getInstance(): Db {
        if (!Db._instance) {
            Db._instance = new Db();
        }
        return Db._instance;
    }

    public getConnection() {
        if (this._conn) {
            return this._conn;
        }
        this._conn = mongoose.createConnection(mongoConfig, {
            useMongoClient: true
        });
        this._conn.then(result => {
            console.log('>>>>>>>>  ' + mongoConfig + '  <<<<<<<<< connect suceess');
        });

        return this._conn;
    }
}
