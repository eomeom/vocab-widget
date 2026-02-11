const db = require("../db");

const express = require("express");
const router = express.Router();

// --- Stub word lists ---
const EN_WORDS = ["serendipity", "ephemeral", "lucid", "resilient", "nostalgia"];

// const ZH_WORDS = [
//   { hanzi: "学习", pinyin: "xué xí", meaning: "to study; to learn" },
//   { hanzi: "朋友", pinyin: "péng you", meaning: "friend" },
//   { hanzi: "时间", pinyin: "shí jiān", meaning: "time" },
//   { hanzi: "机会", pinyin: "jī huì", meaning: "opportunity" },
//   { hanzi: "坚持", pinyin: "jiān chí", meaning: "to persist" }
// ];

const SUPPORTED_LANGS = ["en", "zh"];

// --- Helpers/Utility Functions ---
function pickHourlyItem(list) {
  const hour = Math.floor(Date.now() / 3600000);
  return list[hour % list.length];
}

function baseResponse({ lang, term, definition, source }) {
  return {
    lang,
    term,
    definition,
    meta: {
      source,
      rotates: "hourly",
      timestamp: new Date().toISOString()
    }
  };
}

// ----- Endpoints -----

// --- Health check (/vocab/health)---
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// --- Main vocab endpoint (/vocab?lang=xx) ---
router.get("/", async (req, res) => {
  const lang = (req.query.lang || "en").toLowerCase();

  if (!SUPPORTED_LANGS.includes(lang)) {
    return res.status(400).json({ 
      error: "Unsupported language", 
      supported: SUPPORTED_LANGS 
    });
  }

  // caching headers
  res.set("Cache-Control", "public, max-age=3600"); //1 hour
  res.set("Vary", "lang");

  // --- Chinese ---
  if (lang === "zh") {
  try {
    const hour = Math.floor(Date.now() / 3600000);

    const countRow = db
      .prepare("SELECT COUNT(*) as count FROM words WHERE language='zh'")
      .get();

    const total = countRow.count;
    if (total === 0) {
      return res.status(404).json({ error: "No words available" });
    }


    const offset = hour % total;

    const row = db
      .prepare("SELECT simplified, pinyin, definition FROM words WHERE language='zh' LIMIT 1 OFFSET ?")
      .get(offset);

    if (!row) {
      return res.status(404).json({ error: "Word not found" });
    }

    return res.json(
  baseResponse({
    lang: "zh",
    term: {
      text: row.simplified,
      pronunciation: row.pinyin
    },
    definition: row.definition,
    source: "CC-CEDICT"
  })
);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error" });
  }
}

  // // --- Static Chinese fallback ---
  // if (lang === "zh") {
  //   const word = pickHourlyItem(ZH_WORDS);
  //   return res.json(
  //     baseResponse({
  //       lang: "zh",
  //       term: { text: word.hanzi, pronunciation: word.pinyin },
  //       definition: word.meaning,
  //       source: "cc-cedict (static)"
  //     })
  //   );
  // }

  // --- English ---
  const word = pickHourlyItem(EN_WORDS);

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (!response.ok) {
      // fallback if API fails
      return res.json(
        baseResponse({
          lang: "en",
          term: { text: word, pronunciation: null },
          definition: "Definition temporarily unavailable",
          source: "static fallback"
        })
      );
    }
    
    const data = await response.json();

    const definition =
      data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition || "Definition not found";

    // Optional: get pronunciation if available
    const pronunciation = data?.[0]?.phonetics?.[0]?.text || null;

    return res.json(
      baseResponse({
        lang: "en",
        term: { text: word, pronunciation },
        definition,
        source: "dictionaryapi.dev"
      })
    );
  } catch (err) {
    // fallback for network errors
    return res.json(
      baseResponse({
        lang: "en",
        term: { text: word, pronunciation: null },
        definition: "Definition temporarily unavailable",
        source: "static fallback"
      })
    );
  }  
    
});

module.exports = router;
