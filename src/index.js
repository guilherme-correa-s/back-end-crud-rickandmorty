const express = require("express");
const mongodb = require("mongodb");
const database = require("./infra/database");
const getRoute = require("./routes/characters-get-route");
const postRoute = require("./routes/characters-post-route");
const putRoute = require("./routes/characters-put-route");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

database.connectToServer(function (err, client) {
    if (err) console.log(err);

    app.use("/characters", getRoute);
    app.use("/characters", postRoute);
    app.use("/characters", putRoute);

    app.listen(port, () => console.log(`rodadando http://localhost:${port}`));
});
