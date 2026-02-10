const express = require("express");
const app = express();

const vocabRoute = require("./routes/vocab");


// const PORT = 3000;
// For Render to assign its own port
const PORT = process.env.PORT || 3000;


// middleware
app.use(express.json());

// routes
app.use("/vocab", vocabRoute);

// health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
