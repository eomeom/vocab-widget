const path = require("path");
const Database = require("better-sqlite3");

// Path to database
const dataDir = path.join(__dirname, "../data"); // relative to src/
const dbPath = path.join(dataDir, "vocab.db");

console.log("Opening DB at:", dbPath);

// Open database (read-only recommended for deployment)
const db = new Database(dbPath, { 
    readonly: true 
});

console.log("Connected to SQLite database:", dbPath);

module.exports = db;
