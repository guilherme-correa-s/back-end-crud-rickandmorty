const express = require("express");
const route = express.Router();
const charactersService = require("../service/characters-service");

route.delete("/:id", async (req, res, next) => {
    try {
        const character = await charactersService.delete(req.params.id);
        res.sendStatus(204);
    } catch (e) {
        next(e);
    }
});

module.exports = route;
