const express = require("express");
const route = express.Router();
const charactersService = require("../service/characters-service");

route.get("/", async (req, res) => {
    try {
        const characters = await charactersService.get();
        res.send(characters);
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
});

route.get("/:id", async (req, res) => {
    try {
        const character = await charactersService.getById(req.params.id);
        res.send(character);
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
});

module.exports = route;
