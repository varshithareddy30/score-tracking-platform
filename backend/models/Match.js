const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["Active", "OUT"],
    default: "Active"
  },
  history: {
    type: [Number],
    default: []
  }
});

const MatchSchema = new mongoose.Schema({
  players: {
    type: [PlayerSchema],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Match", MatchSchema);
