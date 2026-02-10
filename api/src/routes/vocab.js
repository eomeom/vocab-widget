// Standardized JSON response
// Same structure across languages
// Input validation (lang)
// Explicit error responses
// Metadata grouped and predictable

const express = require("express");
const router = express.Router();

// MVP-safe static word lists
const EN_WORDS = [
  "serendipity",
  "ephemeral",
  "lucid",
  "resilient",
  "nostalgia"
];

const ZH_WORDS = [
  { hanzi: "学习", pinyin: "xué xí", meaning: "to study; to learn" },
  { hanzi: "朋友", pinyin: "péng you", meaning: "friend" },
  { hanzi: "时间", pinyin: "shí jiān", meaning: "time" },
  { hanzi: "机会", pinyin: "jī huì", meaning: "opportunity" },
  { hanzi: "坚持", pinyin: "jiān chí", meaning: "to persist" }
];

const SUPPORTED_LANGS = ["en", "zh"];

function pickHourlyItem(list) {
  const hour = Math.floor(Date.now() / 3600000);
  return list[hour % list.length];
}

router.get("/", async (req, res) => {
  const lang = (req.query.lang || "en").toLowerCase();

  if (!SUPPORTED_LANGS.includes(lang)) {
    return res.status(400).json({
      error: "Unsupported language",
      supported: SUPPORTED_LANGS
    });
  }

  const timestamp = new Date().toISOString();

  // ---- Chinese ----
  if (lang === "zh") {
    const word = pickHourlyItem(ZH_WORDS);

    return res.json({
      lang: "zh",
      term: {
        text: word.hanzi,
        pronunciation: word.pinyin
      },
      definition: word.meaning,
      meta: {
        source: "cc-cedict (static)",
        rotates: "hourly",
        timestamp
      }
    });
  }

  // ---- English ----
  const word = pickHourlyItem(EN_WORDS);

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();

    const definition =
      data[0]?.meanings?.[0]?.definitions?.[0]?.definition ||
      "Definition not found";

    res.json({
      lang: "en",
      term: {
        text: word,
        pronunciation: null
      },
      definition,
      meta: {
        source: "dictionaryapi.dev",
        rotates: "hourly",
        timestamp
      }
    });
  } catch (err) {
    res.status(502).json({
      error: "Upstream dictionary API failed"
    });
  }
});

module.exports = router;

// // OLD VERSION

// const express = require("express");
// const router = express.Router();

// // simple word list for now (MVP-safe)
// const EN_WORDS = [
//   "serendipity",
//   "ephemeral",
//   "lucid",
//   "resilient",
//   "nostalgia"
// ];

// const ZH_WORDS = [
//   { hanzi: "学习", pinyin: "xué xí", meaning: "to study; to learn" },
//   { hanzi: "朋友", pinyin: "péng you", meaning: "friend" },
//   { hanzi: "时间", pinyin: "shí jiān", meaning: "time" },
//   { hanzi: "机会", pinyin: "jī huì", meaning: "opportunity" },
//   { hanzi: "坚持", pinyin: "jiān chí", meaning: "to persist" }
// ];

// function pickHourlyItem(list) {
//   const hour = Math.floor(Date.now() / 3600000);
//   return list[hour % list.length];
// }

// router.get("/", async (req, res) => {
//   const lang = req.query.lang || "en";

//   if (lang === "zh") {
//   //const word =
//     //ZH_WORDS[Math.floor(Math.random() * ZH_WORDS.length)];

//   const word = pickHourlyItem(ZH_WORDS);


//   return res.json({
//     language: "zh",
//     word: word.hanzi,
//     pinyin: word.pinyin,
//     definition: word.meaning,
//     source: "cc-cedict (static)",
//     timestamp: new Date().toISOString()
//   });
// }

//   if (lang !== "en") {
//   return res.status(400).json({ error: "Language not supported yet" });
// }


//   //const randomWord =
//     //EN_WORDS[Math.floor(Math.random() * EN_WORDS.length)];

//   const randomWord = pickHourlyItem(EN_WORDS);


//   try {
//     const response = await fetch(
//       `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`
//     );
//     const data = await response.json();

//     const definition =
//       data[0]?.meanings?.[0]?.definitions?.[0]?.definition ||
//       "Definition not found";

//     res.json({
//       language: "en",
//       word: randomWord,
//       definition,
//       source: "dictionaryapi.dev",
//       timestamp: new Date().toISOString()
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch word" });
//   }
// });

// module.exports = router;



// // TESTING 
// // const express = require("express");
// // const router = express.Router();

// // router.get("/", (req, res) => {
// //   const lang = req.query.lang || "en";

// //   res.json({
// //     language: lang,
// //     word: "test",
// //     definition: "test definition",
// //     source: "local",
// //     timestamp: new Date().toISOString()
// //   });
// // });

// // module.exports = router;

