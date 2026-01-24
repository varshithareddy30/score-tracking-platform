const Match = require("../models/Match");

const startMatch = async (req, res) => {
  try {
    const { players } = req.body;

    if (!Array.isArray(players) || players.length === 0) {
      return res.status(400).json({ message: "Players array required" });
    }

    const match = new Match({
      players: players.map((name) => ({
        name,
        score: 0,
        status: "Active",
        history: []
      }))
    });

    await match.save();
    res.status(201).json(match);
  } catch (err) {
    console.error("startMatch error:", err);
    res.status(500).json({ message: "Start match failed" });
  }
};

const addScore = async (req, res) => {
  try {
    const { matchId, playerIndex, score } = req.body;

    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ message: "Match not found" });

    const player = match.players[playerIndex];
    if (!player) return res.status(400).json({ message: "Invalid player index" });

    player.score += score;
    player.history.push(score);

    if (player.score >= 201) {
      player.status = "OUT";
    }

    await match.save();
    res.json({ players: match.players });
  } catch (err) {
    console.error("addScore error:", err);
    res.status(500).json({ message: "Add score failed" });
  }
};

const rejoinPlayer = async (req, res) => {
  try {
    const { matchId, playerIndex } = req.body;

    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ message: "Match not found" });

    const activePlayers = match.players.filter(
      (p) => p.status === "Active" && p.score < 180
    );

    if (activePlayers.length === 0) {
      return res.status(400).json({ message: "No eligible rejoin score" });
    }

    const highest = Math.max(...activePlayers.map((p) => p.score));
    const player = match.players[playerIndex];

    if (!player) return res.status(400).json({ message: "Player not found" });

    player.score = highest + 1;
    player.status = "Active";
    player.history.push(highest + 1); // ⚠️ NUMBER ONLY

    await match.save();
    res.json({ players: match.players });
  } catch (err) {
    console.error("rejoin error:", err);
    res.status(500).json({ message: "Rejoin failed" });
  }
};

const resetMatch = async (req, res) => {
  try {
    const { matchId } = req.body;

    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ message: "Match not found" });

    match.players.forEach((p) => {
      p.score = 0;
      p.status = "Active";
      p.history = [];
    });

    await match.save();
    res.json({ players: match.players });
  } catch (err) {
    console.error("reset error:", err);
    res.status(500).json({ message: "Reset failed" });
  }
};

module.exports = {
  startMatch,
  addScore,
  rejoinPlayer,
  resetMatch
};
