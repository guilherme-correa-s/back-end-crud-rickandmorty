const databaseMongo = require("../infra/database");

exports.get = async () => {
    const db = databaseMongo.getDb();
    const characters = await db.find().toArray();
    return characters;
};

exports.getById = async (id) => {
    const db = databaseMongo.getDb();

    const character = await db.findOne({ _id: id });
    return character;
};

exports.post = async (newCharacter) => {
    const db = databaseMongo.getDb();
    const res = await db.insertOne(newCharacter);
    return res;
};

exports.put = async (id, updateCharacter) => {
    const db = databaseMongo.getDb();
    const res = await db.updateOne(
        {
            _id: id,
        },
        {
            $set: updateCharacter,
        }
    );
    return res;
};
