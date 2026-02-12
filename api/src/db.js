const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

// Path to database
const dataDir = path.join(__dirname, "../data"); // relative to src/
const dbPath = path.join(dataDir, "vocab.db");

// Ensure folder exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log(`Created data directory at ${dataDir}`);
}

// Open database (read-only recommended for deployment)
const db = new Database(dbPath, { readonly: true });

console.log("Connected to SQLite database:", dbPath);

module.exports = db;
