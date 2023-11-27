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

app.post('/login', (req, res) => {
    const { email, password, remember } = req.body;
    db.get(
        'SELECT user_id, username, email FROM UserAccounts WHERE email = ?',
        [email],
        (err, row) => {
            if (err) {
                return res.send('error when logging in');
            }

            bcrypt.compare(password, row.password, (err, result) => {
                if (err) {
                    return res.render('error');
                }

                if (!result) {
                    return res.render('invalid credentials');
                }

                req.session.user = row;
                if (remember) {
                    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Set session expiration to 30 days
                }
            });
        }
    );
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
    let places = await db.query("SELECT * FROM Place_listing");
    res.json(places["rows"]);
});

app.get("/data/place_business_hours", async (req, res) => {
    // returns all the place_businessHours as an array of json objects
    let places = await db.query("SELECT * FROM Place_businessHours");
    res.json(places["rows"]);
});

app.get("/data/place_address", async (req, res) => {
    // returns all the place_addresses as an array of json objects
    let places = await db.query("SELECT * FROM Place_address");
    res.json(places["rows"]);
});

app.get("/data/place_comments", async (req, res) => {
    // returns all the place_comments as an array of json objects
    let places = await db.query("SELECT * FROM Place_comments");
    res.json(places["rows"]);
});

app.get("/data/user_reports", async (req, res) => {
    // returns all the user_reports as an array of json objects
    let places = await db.query("SELECT * FROM UserReports");
    res.json(places["rows"]);
});

app.post("/api/submitComment", async (req, res) => {
    // save the comment a user leaves for a specific place
    let { user_id } = req.session.user;
})

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});

