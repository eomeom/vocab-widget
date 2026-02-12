const express = require("express");
const router = express.Router();
const db = require("../db");

// RANDOM WORD
router.get("/random", (req, res) => {
  try {
    const language = req.query.language || "en";
    const stmt = db.prepare(`
      SELECT simplified, traditional, pinyin, definition
      FROM words
      WHERE language = ?
      ORDER BY RANDOM()
      LIMIT 1
    `);
    const word = stmt.get(language);

    if (!word) return res.status(404).json({ error: "No word found" });

    res.json(word);
  } catch (err) {
    console.error("Random route error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// SEARCH
router.get("/search", (req, res) => {
  try {
    const language = req.query.language || "en";
    const q = req.query.q?.trim();
    if (!q) return res.status(400).json({ error: "Missing search query" });

    const likeQ = `%${q}%`;

    const stmt = db.prepare(`
      SELECT simplified, traditional, pinyin, definition
      FROM words
      WHERE language = ?
        AND (
          simplified LIKE ?
          OR traditional LIKE ?
          OR pinyin LIKE ?
          OR definition LIKE ?
        )
      LIMIT 50
    `);

    const results = stmt.all(language, likeQ, likeQ, likeQ, likeQ);

    res.json({ count: results.length, results });
  } catch (err) {
    console.error("Search route error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
