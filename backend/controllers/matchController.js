const Match = require("../models/Match");

// Start new match
exports.startMatch = async (req, res) => {
  const { players } = req.body;

  const match = new Match({
    players: players.map((name) => ({
      name,
      score: 0,
      status: "Active",
      history: []
    }))
  });

  await match.save();
  res.json(match);
};

// Add score
exports.addScore = async (req, res) => {
  const { matchId, playerIndex, value } = req.body;

  const match = await Match.findById(matchId);
  const player = match.players[playerIndex];

  player.history.push(value.toString());
  player.score += value;

  if (player.score > 201) {
    player.status = "OUT";
  }

  await match.save();
  res.json(match);
};

// Rejoin player
exports.rejoinPlayer = async (req, res) => {
  const { matchId, playerIndex } = req.body;

  const match = await Match.findById(matchId);

  const activePlayers = match.players.filter(
    (p) => p.status === "Active"
  );

  if (activePlayers.length === 0) {
    return res.status(400).json({ message: "No active players" });
  }

  const highestActiveScore = Math.max(
    ...activePlayers.map((p) => p.score)
  );

  if (highestActiveScore >= 180) {
    return res
      .status(400)
      .json({ message: "Re-entry not allowed" });
  }

  match.players[playerIndex].status = "Active";
  match.players[playerIndex].score = highestActiveScore + 1;
  match.players[playerIndex].history.push(
    `Rejoin@${highestActiveScore + 1}`
  );

  await match.save();
  res.json(match);
};

// Reset match
exports.resetMatch = async (req, res) => {
  const { matchId } = req.body;

  const match = await Match.findById(matchId);

  match.players.forEach((p) => {
    p.score = 0;
    p.status = "Active";
    p.history = [];
  });

  await match.save();
  res.json(match);
};
