const MongoClient = require('mongodb').MongoClient;

const config = require('./db.config').dbConfig;

class Connection{

    static async connect(){
        if(this._client){
            return this._client;
        }
        else{
            this._client = await MongoClient.connect(this.config.uri, this.config.options);
            this._db = this._client.db(this.config.db);
            console.log(this._client);
            console.log(this._db);
            return this._client;
        }
    }
}

Connection._client = undefined;
Connection._db = undefined;
Connection.config = config;

module.exports = { Connection };