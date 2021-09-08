const express = require("express");
const mongodb = require("mongodb");
const database = require("./infra/database");
const getRoute = require("./routes/characters-get-route");
const postRoute = require("./routes/characters-post-route");
const putRoute = require("./routes/characters-put-route");
const deleteRoute = require("./routes/characters-delete-route");
var cors = require("cors");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

database.connectToServer(function (err, client) {
    if (err) console.log(err);
    app.use(cors());
    app.options("*", cors());
    app.use("/characters", getRoute);
    app.use("/characters", postRoute);
    app.use("/characters", putRoute);
    app.use("/characters", deleteRoute);
    app.use((error, req, res, next) => {
        if (
            error.message == "Characters not found." ||
            error.message == "Character not found."
        )
            return res.status(404).send({ error: error.message });
        else if (
            error.message == "Id is not valid." ||
            error.message == "The character must contain: nome and imagemUrl."
        )
            return res.status(400).send({ error: error.message });
        else return res.status(500).send({ error: error.message });
    });
    app.all("*", function (req, res) {
        res.status(404).send({ message: "Endpoint was not found" });
    });
    app.all("/*", (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");

        res.header("Access-Control-Allow-Methods", "*");

        res.header(
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
        );

        next();
    });

    app.listen(port, () => console.log(`rodadando http://localhost:${port}`));
});
