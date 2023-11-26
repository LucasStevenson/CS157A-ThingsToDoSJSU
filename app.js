const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./database").createDbConnection(process.env.DB_ENV === "PRODUCTION" ? "production.db" : "test.db");

// parse request bodies
app.use(express.json());

const PORT = 6000;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});
