const MongoClient = require('mongodb').MongoClient;
const config = require('./db.config').dbConfig;

let _db;

const dbConnect = ()=>{
    MongoClient.connect(config.uri, config.options)
    .then((client)=>{
        console.log("Connected to database");
        console.log(client);
        _db = client.db(config.db);
        // console.log(_db);
    })
    .catch((err)=>{
        console.log("Failed to connect to database");
        console.log(err);
    })
}

const getDbConn = ()=>{
    return _db;
}

exports.dbConnect = dbConnect;
exports.getDbConn = getDbConn;
