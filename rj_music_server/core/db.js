import mongoose from 'mongoose';
const mongoConfig = 'mongodb://localhost/rj_music';
const promise = mongoose.createConnection(mongoConfig, {
    useMongoClient: true
});

promise.then(function() {
    console.log('>>>>>>>>  ' + mongoConfig + '  <<<<<<<<<<<< connect suceess');
});

export default promise;
