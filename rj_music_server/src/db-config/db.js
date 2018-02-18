"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by GyjLoveLh on  2018/2/9
 */
const mongoose = require("mongoose");
const mongoConfig = "mongodb://localhost/rj_music";
class Db {
    constructor() {
        this._conn = null;
    }
    static getInstance() {
        if (!Db._instance) {
            Db._instance = new Db();
        }
        return Db._instance;
    }
    getConnection() {
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
Db._instance = null;
exports.Db = Db;
