const Match = require("../models/Match");
exports.addScore = async (req, res) => {
  try {
    const { matchId, playerIndex, score } = req.body;

    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    match.players[playerIndex].score += score;
    match.players[playerIndex].history.push(score);

    if (match.players[playerIndex].score >= 201) {
      match.players[playerIndex].status = "OUT";
    }

    await match.save();

    res.json({ players: match.players });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add score" });
  }
};
