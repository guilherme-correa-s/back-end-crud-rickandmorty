const MongoClient = require("mongodb").MongoClient;
require("dotenv").config("../.env");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbCollection = process.env.DB_COLLECTION;
const dbChar = process.env.DB_CHAR;

const url =
    `mongodb+srv://${dbUser}:${dbPassword}@rick-and-morty.${dbChar}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

var _db;

module.exports = {
    connectToServer: async function (callback) {
        await MongoClient.connect(
            url,
            { useNewUrlParser: true },
            function (err, client) {
                _db = client.db(dbName).collection(dbCollection);
                return callback(err);
            }
        );
    },

    getDb: function () {
        return _db;
    },
};
