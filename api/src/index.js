//required for widgets

const express = require("express");
const cors = require("cors");
const vocabRoute = require("./routes/vocab");
const wordsRoute = require("./routes/words");

const app = express();
// For Render to assign its own port
const PORT = process.env.PORT || 3000;

// Rate limiting middleware
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute per IP
});

app.use(limiter);


// middleware
app.use(express.json());
app.use(cors());


// root endpoint
app.get("/", (req, res) => {
  res.send("Vocab Widget API is running");
});

// routes
app.use("/vocab", vocabRoute);     // existing
app.use("/words", wordsRoute);     // new


// global health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "vocab-api",
    timestamp: new Date().toISOString()
  });
});

// // health check
// app.get("/health", (req, res) => {
//   res.json({ status: "ok" });
// });

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
