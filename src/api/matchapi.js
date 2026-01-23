import axios from "axios";

const API = axios.create({
  baseURL: "https://rummy-score-tracker-x64p.onrender.com/api/match"

});

export const startMatch = (players) =>
  API.post("/start", { players });

export const addScore = (matchId, playerIndex, value) =>
  API.post("/add-score", { matchId, playerIndex, value });

export const rejoinPlayer = (matchId, playerIndex) =>
  API.post("/rejoin", { matchId, playerIndex });

export const resetMatch = (matchId) =>
  API.post("/reset", { matchId });
