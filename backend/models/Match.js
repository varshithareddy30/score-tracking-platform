const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: String,
  score: Number,
  status: String,
  history: [String]
});

const MatchSchema = new mongoose.Schema({
  players: [PlayerSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Match", MatchSchema);
