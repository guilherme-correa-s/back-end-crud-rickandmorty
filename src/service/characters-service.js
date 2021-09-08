const charactersData = require("../data/characters-data");
const mongodb = require("mongodb");

exports.get = async () => {
    const personagens = await charactersData.get();
    if (!personagens) throw new Error("Characters not found.");
    return personagens;
};

exports.getById = async (id) => {
    const ObjectId = mongodb.ObjectId;
    if (!ObjectId.isValid(id)) throw new Error("Id is not valid.");
    id = ObjectId(id);
    const character = await charactersData.getById(id);
    if (!character) throw new Error("Character not found.");
    return character;
};

exports.post = async (newCharacter) => {
    if (!newCharacter || !newCharacter.nome || !newCharacter.imagemUrl)
        throw new Error("The character must contain: nome and imagemUrl.");
    const { acknowledged } = await charactersData.post(newCharacter);
    if (!acknowledged) throw new Error("Mongodb Server error.");
};

exports.put = async (id, updateCharacter) => {
    await exports.getById(id);
    if (!updateCharacter || !updateCharacter.nome || !updateCharacter.imagemUrl)
        throw new Error("The character must contain: nome and imagemUrl.");
    const ObjectId = mongodb.ObjectId;
    id = ObjectId(id);
    const { acknowledged } = await charactersData.put(id, updateCharacter);
    if (!acknowledged) throw new Error("Mongodb Server error.");
    const character = await exports.getById(id);
    console.log(character);
    return character;
};
