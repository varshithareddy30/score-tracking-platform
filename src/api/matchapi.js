import axios from "axios";

const API = axios.create({
  baseURL: "https://rummy-score-tracker-x64p.onrender.com/api/match"
});

// START MATCH
export const startMatch = (playerNames) => {
  return API.post("/start", {
    players: playerNames
  });
};


// ADD SCORE
export const addScore = (matchId, playerIndex, value) => {
  return API.post("/add-score", {
    matchId,
    playerIndex,
    value
  });
};

// REJOIN PLAYER
export const rejoinPlayer = (matchId, playerIndex) => {
  return API.post("/rejoin", {
    matchId,
    playerIndex
  });
};

// RESET MATCH
export const resetMatch = (matchId) => {
  return API.post("/reset", {
    matchId
  });
};
