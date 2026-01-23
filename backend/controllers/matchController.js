exports.startMatch = async (req, res) => {
  try {
    const { players } = req.body;

    // ✅ VALIDATION
    if (!players || !Array.isArray(players) || players.length === 0) {
      return res.status(400).json({
        message: "Players array is required"
      });
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

  } catch (error) {
    console.error("Start Match Error:", error);
    res.status(500).json({
      message: "Failed to start match",
      error: error.message
    });
  }
};
