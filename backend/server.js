require("dotenv").config(); // 🔴 THIS LINE FIXES YOUR ERROR

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const matchRoutes = require("./routes/matchRoutes");

const app = express();

/* ======================
   MIDDLEWARE
====================== */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));

app.use(express.json());

/* ======================
   ROUTES
====================== */
app.use("/api/match", matchRoutes);

app.get("/", (req, res) => {
  res.send("Rummy Score Tracker Backend is running 🚀");
});

/* ======================
   MONGODB CONNECTION
====================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

/* ======================
   SERVER START
====================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
