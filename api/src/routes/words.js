const express = require("express");
const router = express.Router();
const db = require("../db");

const { convertPinyin } = require("../utils/pinyin");

// In-memory cache for random word to reduce DB load
let cachedRandom = null;
let lastFetchTime = 0;

// RANDOM WORD
router.get("/random", (req, res) => {
  const now = Date.now();
  const ONE_HOUR = 60 * 60 * 1000;

  if (cachedRandom && now - lastFetchTime < ONE_HOUR) {
    return res.json(cachedRandom);
  }

  const language = req.query.language || "zh";

  const stmt = db.prepare(`
    SELECT simplified, traditional, pinyin, definition
    FROM words
    WHERE language = ?
    ORDER BY RANDOM()
    LIMIT 1
  `);

  const word = stmt.get(language);

  if (!word) return res.status(404).json({ error: "No word found" });

  word.pinyin = convertPinyin(word.pinyin);

  cachedRandom = word;
  lastFetchTime = now;

  res.json(word);
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

    results.forEach(word => {
      word.pinyin = convertPinyin(word.pinyin);
    });

    res.json({ count: results.length, results });
    
  } catch (err) {
    console.error("Search route error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
