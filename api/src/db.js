const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "../../data/vocab.db");

const db = new Database(dbPath);

console.log("Connected to SQLite database.");

module.exports = db;
