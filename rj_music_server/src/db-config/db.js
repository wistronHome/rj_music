"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by GyjLoveLh on  2018/2/9
 */
const mongoose = require("mongoose");
const mongoConfig = "mongodb://localhost/rj_music";
class Db {
    static getInstance() {
        if (!Db._instance) {
            Db._instance = new Db();
        }
        return Db._instance;
    }
    getConnection() {
        let promise = mongoose.createConnection(mongoConfig, {
            useMongoClient: true
        });
        promise.then(result => {
            console.log('>>>>>>>>  ' + mongoConfig + '  <<<<<<<<< connect suceess');
        });
        return promise;
    }
}
Db._instance = null;
exports.Db = Db;
