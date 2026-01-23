const Match = require("../models/Match");
exports.startMatch = async (req, res) => {
  try {
    const { players } = req.body;

    if (!players || !Array.isArray(players) || players.length === 0) {
      return res.status(400).json({ message: "Players array is required" });
    }

    const match = new Match({
      players: players.map(name => ({
        name,
        score: 0,
        status: "Active",
        history: []
      }))
    });

    await match.save();
    res.status(201).json(match);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addScore = async (req, res) => {
  res.json({ message: "addScore ok" });
};

exports.rejoinPlayer = async (req, res) => {
  res.json({ message: "rejoin ok" });
};

exports.resetMatch = async (req, res) => {
  res.json({ message: "reset ok" });
};
