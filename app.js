const express = require('express');
const sqlite3 = require('sqlite3').verbose();
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

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post(
  '/signup',
  [
    body('firstName').notEmpty().trim().escape(),
    body('lastName').notEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('error', {errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.render('error', { message: 'An error occurred' });
      }

      db.run(
        'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
        [firstName, lastName, email, hashedPassword],
        (err) => {
          if (err) {
            return res.render('error', { message: 'An error occurred' });
          }

          res.redirect('/login');
        }
      );
    });
  }
);

app.get('/login', (req, res) => {
    res.render('login', { message: '' });
});

app.post('/login', (req, res) => {
  const { email, password, remember } = req.body;
  db.get(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, row) => {
      if (err) {
        return res.render('error', { message: 'An error occurred' });
      }

      if (!row) {
        return res.render('login', { message: 'Invalid credentials' });
      }

      bcrypt.compare(password, row.password, (err, result) => {
        if (err) {
          return res.render('error', { message: 'An error occurred' });
        }

        if (!result) {
          return res.render('login', { message: 'Invalid credentials' });
        }

        req.session.user = row;
        if (remember) {
          req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Set session expiration to 30 days
        }

        res.redirect('/dashboard');
      });
    }
  );
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  res.render('dashboard', { user: req.session.user });
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.render('error', { message: 'An error occurred' });
    }

    res.redirect('/login');
  });
});

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});

