const express = require('express');
const session = require('express-session');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const path = require('path');
const app = express();
require("dotenv").config();
const db = require("./database").createDbConnection(process.env.DB_ENV === "PRODUCTION" ? "production.db" : "test.db");

// parse request bodies
app.use(express.json());

const PORT = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

app.post('/signup', [body('username').isLength({ max: 30 }), body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 6 })], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send('error when signing up');
        }
        const { username, email, password } = req.body;
        let hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO UserAccounts (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
        console.log(`User with email ${email} successfully signed up`);
        return res.send("Successfully signed up");
    } catch (err) {
        console.log(err.message);
        return res.send('error when signing up');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password, remember } = req.body;
        let row = await db.query("SELECT * FROM UserAccounts WHERE email = ?", [email]);
        row = row["rows"][0];
        let isValidPw = await bcrypt.compare(password, row.password);
        if (!isValidPw) return res.status(400).send("User does not exist");
        req.session.user = { "user_id": row.user_id, "username": row.username, "email": row.email };
        if (remember) {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Set session expiration to 30 days
        }
        return res.status(200).send("Successfully logged in");
    } catch (err) {
        console.log(err);
        return res.status(400).send("Something went wrong while logging in");
    }
});

app.get('/logout', async (req, res) => {
    try {
        req.session.destroy();
    } catch (err) {
        return res.send('error');
    }
});

app.get("/data/place_listings", async (req, res) => {
    // returns all the place_listings as an array of json objects
    let data = await db.query("SELECT * FROM Place_listing");
    res.json(data["rows"]);
});

app.get("/data/place_business_hours", async (req, res) => {
    // returns all the place_businessHours as an array of json objects
    let data = await db.query("SELECT * FROM Place_businessHours");
    res.json(data["rows"]);
});

app.get("/data/place_address", async (req, res) => {
    // returns all the place_addresses as an array of json objects
    let data = await db.query("SELECT * FROM Place_address");
    res.json(data["rows"]);
});

app.get("/data/place_comments", async (req, res) => {
    // returns all the place_comments as an array of json objects
    let data = await db.query("SELECT * FROM Place_comments");
    res.json(data["rows"]);
});

app.get("/data/user_reports", async (req, res) => {
    // returns all the user_reports as an array of json objects
    let data = await db.query("SELECT * FROM UserReports");
    res.json(data["rows"]);
});

app.post("/api/submitComment", async (req, res) => {
    try {
        // save the comment a user leaves for a specific place
        let { user_id } = req.session.user;
        let { comment, rating, place_name } = req.body;

        let obj = await db.query("SELECT place_id FROM Place_listing WHERE name = ?", [place_name]);
        let { place_id } = obj["rows"][0];

        await db.query("INSERT INTO Place_comments (place_id, user_id, rating, comment) VALUES (?, ?, ?, ?)", [place_id, user_id, rating, comment]);
        return res.send("Successfully submitted comment");
    } catch (err) {
        return res.send("Error when submitting comment");
    }
})

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});

