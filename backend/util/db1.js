const MongoClient = require('mongodb').MongoClient;

const config = require('./db.config').dbConfig;

class Connection{

    static connect(){
        if(this._client){
            return this._client;
        }
        else{
            MongoClient.connect(this.config.uri, this.config.options)
            .then( client =>{
                console.log("--> Connected to the database");
                this._client = client;
                this._db = client.db(this.config.db);
                return client;
            })
            .catch( err =>{
                throw err;
            })
        }
    }
}

Connection._client = undefined;
Connection._db = undefined;
Connection.config = config;

module.exports = { Connection };