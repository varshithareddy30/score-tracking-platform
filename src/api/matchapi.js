import axios from "axios";

// ✅ Render backend URL
const BASE_URL = "https://rummy-score-tracker-gekq.onrender.com/api/match";

export const startMatch = (players) =>
  axios.post(`${BASE_URL}/start`, { players });

export const addScore = (matchId, playerIndex, score) =>
  axios.post(`${BASE_URL}/add`, { matchId, playerIndex, score });

export const rejoinPlayer = (matchId, playerIndex) =>
  axios.post(`${BASE_URL}/rejoin`, { matchId, playerIndex });

export const resetMatch = (matchId) =>
  axios.post(`${BASE_URL}/reset`, { matchId });
