const express = require("express");
const route = express.Router();
const charactersService = require('../service/characters-service');

route.post("/", async (req, res) => {
    try {
        const newCharacter = await charactersService.post(req.body);
        res.status(201).send({message: "character created sucess!"});
    } catch (e) {
        res.status(400).send({error: e.message});
    }
});

module.exports = route;