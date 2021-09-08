const express = require("express");
const route = express.Router();
const charactersService = require("../service/characters-service");

route.post("/", async (req, res, next) => {
    try {
        const newCharacter = await charactersService.post(req.body);
        res.status(201).send(newCharacter);
    } catch (e) {
        next(e);
    }
});

module.exports = route;
