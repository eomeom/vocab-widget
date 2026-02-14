// db.js - Database connection setup
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.query("SELECT NOW()")
  .then(() => console.log("PostgreSQL connected successfully"))
  .catch(err => console.error("Postgres connection error:", err));

module.exports = pool;


// const path = require("path");
// const Database = require("better-sqlite3");

// // Path to database
// const dataDir = path.join(__dirname, "../data"); // relative to src/
// const dbPath = path.join(dataDir, "vocab.db");

// console.log("Opening DB at:", dbPath);

// // Open database (read-only recommended for deployment)
// const db = new Database(dbPath, { 
//     readonly: true 
// });

// console.log("Connected to SQLite database:", dbPath);

// module.exports = db;
