const sqlite3 = require("sqlite3").verbose();

function createDbConnection(dbPath) {
    let db = new sqlite3.Database(dbPath, (err) => {
        if (err) return console.error(err);
        createTables(db);
    });
    console.log(`Successfully connected to database '${dbPath}'`);
    return db;
}

function createTables(db) {
    db.exec(`

        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS Place_listing (
            place_id INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL,
            address VARCHAR(50) NOT NULL,
            business_type VARCHAR(50) NOT NULL,
            recommendation_rating REAL NOT NULL,
            cash_rating REAL NOT NULL,
            phone_number VARCHAR(20) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Place_comments (
            comment_id INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL,
            place_id INT NOT NULL,
            comment VARCHAR(200) NOT NULL,
            FOREIGN KEY (place_id) REFERENCES Place_listing(place_id)
        );

        CREATE TABLE IF NOT EXISTS Place_businessHours (
            business_hour_id INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL,
            place_id INT NOT NULL,
            day_of_week INT NOT NULL,
            open_time TIME NOT NULL,
            close_time TIME NOT NULL,
            FOREIGN KEY (place_id) REFERENCES Place_listing(place_id)
        );

        CREATE TABLE IF NOT EXISTS UserAccounts (
            user_id INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL,
            email VARCHAR(70) NOT NULL,
            password VARCHAR(64) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS UserReports (
            report_id INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL,
            place_id INT NOT NULL,
            user_id INT NOT NULL,
            report_description VARCHAR(200) NOT NULL,
            FOREIGN KEY (place_id) REFERENCES Place_listing(place_id),
            FOREIGN KEY (user_id) REFERENCES UserAccounts(user_id)
        );
        `, (err) => {
        if (err) return console.error(err);
    });
}

module.exports = { createDbConnection };
