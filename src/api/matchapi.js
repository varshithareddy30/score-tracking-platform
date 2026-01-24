import axios from "axios";

const BASE_URL = "http://localhost:5000/api/match";
// when deployed → replace with Render URL

export const startMatch = (players) =>
  axios.post(`${BASE_URL}/start`, { players });

export const addScore = (matchId, playerIndex, score) =>
  axios.post(`${BASE_URL}/add-score`, { matchId, playerIndex, score });

export const rejoinPlayer = (matchId, playerIndex) =>
  axios.post("http://localhost:5000/api/match/rejoin", {
    matchId,
    playerIndex
  });


export const resetMatch = (matchId) =>
  axios.post(`${BASE_URL}/reset`, { matchId });
