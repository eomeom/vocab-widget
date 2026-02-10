//required for widgets

const express = require("express");
const cors = require("cors");
const vocabRoute = require("./routes/vocab");

const app = express();
// For Render to assign its own port
const PORT = process.env.PORT || 3000;
// const PORT = 3000;


// middleware
app.use(express.json());
app.use(cors());


// root endpoint
app.get("/", (req, res) => {
  res.send("Vocab Widget API is running");
});

// routes
app.use("/vocab", vocabRoute);

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
