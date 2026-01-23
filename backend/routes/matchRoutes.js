const express = require("express");
const router = express.Router();
const {
  startMatch,
  addScore,
  rejoinPlayer,
  resetMatch
} = require("../controllers/matchController");

router.post("/start", startMatch);
router.post("/add-score", addScore);
router.post("/rejoin", rejoinPlayer);
router.post("/reset", resetMatch);

module.exports = router;
