const express = require("express");
const route = express.Router();
const charactersService = require("../service/characters-service");

route.get("/", async (req, res, next) => {
    try {
        const characters = await charactersService.get();
        res.send(characters);
    } catch (e) {
        next(e);
    }
});

route.get("/:id", async (req, res, next) => {
    try {
        const character = await charactersService.getById(req.params.id);
        res.send(character);
    } catch (e) {
        next(e);
    }
});

module.exports = route;
