const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ── Serve frontend static files ──
// All your HTML, CSS, JS files are served from the root folder
app.use(express.static(path.join(__dirname, "../")));

// ── MongoDB ──
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ── API Routes ──
app.use("/api/blogs", require("./routes/blogRoutes"));

// ── Catch-all: serve index.html for any unknown route ──
app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});