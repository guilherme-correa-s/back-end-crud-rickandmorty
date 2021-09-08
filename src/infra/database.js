const MongoClient = require("mongodb").MongoClient;

const url =
    "mongodb+srv://admin:admin@rick-and-morty.sngap.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var _db;

module.exports = {
    connectToServer: async function (callback) {
        await MongoClient.connect(
            url,
            { useNewUrlParser: true },
            function (err, client) {
                _db = client.db("rick-and-morty").collection("personagens");
                return callback(err);
            }
        );
    },

    getDb: function () {
        return _db;
    },
};
