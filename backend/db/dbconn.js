
const dotenv = require("dotenv");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

dotenv.config({path: path.join(__dirname , './../.env')});

const uri=process.env['DBURI'];

const dbClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

dbClient.connect()
.then((client)=>{
    console.log("Connected to database!\n");
    console.log(client);
})
.catch((err)=>{
    console.log("Error connecting to database!");
    console.log(err);
});

module.exports = { dbClient };
