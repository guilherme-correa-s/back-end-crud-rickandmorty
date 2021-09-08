const express = require("express");
const route = express.Router();
const charactersService = require("../service/characters-service");

route.put("/:id", async (req, res, next) => {
    try {
        const updateCharacter = req.body;
        const character = await charactersService.put(
            req.params.id,
            updateCharacter
        );
        res.json(character);
    } catch (e) {
        next(e);
    }
});

module.exports = route;
