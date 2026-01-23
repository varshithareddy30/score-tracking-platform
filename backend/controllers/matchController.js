const Match = require("../models/Match");
exports.addScore = async (req, res) => {
  try {
    const { matchId, playerIndex, score } = req.body;

    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    const player = match.players[playerIndex];
    if (!player) {
      return res.status(400).json({ message: "Invalid player index" });
    }

    player.score += score;
    player.history.push(score);

    if (player.score >= 201) {
      player.status = "OUT";
    }

    await match.save();

    res.json({ players: match.players });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Add score failed" });
  }
};
