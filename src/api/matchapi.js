import axios from "axios";

const API = axios.create({
  baseURL: "https://rummy-score-tracker-mt8s.onrender.com/api/match"
});

export const startMatch = (playerNames) =>
  API.post("/start", { players: playerNames });

export const addScore = (data) =>
  API.post("/add-score", data);

export const rejoinPlayer = (data) =>
  API.post("/rejoin", data);

export const resetMatch = () =>
  API.post("/reset");
