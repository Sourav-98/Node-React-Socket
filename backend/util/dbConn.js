const MongoClient = require('mongodb').MongoClient;

const dbConfig = require('./db.config').dbConfig;


// MongoDb Connection Pool
class Connection{

    static _client = undefined;
    static _db = undefined;
    static config = dbConfig;

    static async connect(){
        if(this._client){
            return this._client;
        }
        else{
            MongoClient.connect(this.config.uri, this.config.options)
            .then( client =>{
                console.log("--------Connected to MongoDB database--------");
                this._client = client;
                this._db = client.db(this.config.db);
                // console.log(Connection);
            })
            .catch( err =>{
                throw err;
            })
        }
    }
}

module.exports = { Connection };
