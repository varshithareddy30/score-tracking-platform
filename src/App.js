import React, { useState } from "react";
import {
  startMatch,
  addScore,
  rejoinPlayer,
  resetMatch
} from "./api/matchapi";
import "./App.css";

function App() {
  const [numPlayers, setNumPlayers] = useState("");
  const [players, setPlayers] = useState([]);
  const [matchId, setMatchId] = useState(null);

  return (
    <div className="container">
      <h1>🎴 Rummy Score Tracker</h1>

      {/* ===== START SCREEN ===== */}
      {!matchId && (
        <>
          <input
            type="number"
            placeholder="Number of Players"
            value={numPlayers}
            onChange={(e) => setNumPlayers(e.target.value)}
          />

          {[...Array(Number(numPlayers))].map((_, i) => (
            <input
              key={i}
              placeholder={`Player ${i + 1}`}
              onChange={(e) => {
                const copy = [...players];
                copy[i] = { name: e.target.value };
                setPlayers(copy);
              }}
            />
          ))}

          <button
            onClick={async () => {
              try {
                const names = players.map(p => p?.name?.trim());
                if (names.some(n => !n)) {
                  alert("Enter all player names");
                  return;
                }

                const res = await startMatch(names);
                setPlayers(res.data.players);
                setMatchId(res.data._id);
              } catch {
                alert("Failed to start match");
              }
            }}
          >
            ▶ Start Match
          </button>
        </>
      )}

      {/* ===== MATCH SCREEN ===== */}
      {matchId && (
        <>
          {/* Controls */}
          <div style={{ marginBottom: "15px" }}>
            {/* Restart same match */}
            <button
              onClick={async () => {
                try {
                  const res = await resetMatch(matchId);
                  setPlayers(res.data.players);
                } catch {
                  alert("Reset failed");
                }
              }}
            >
              🔄 Restart Match
            </button>

            {/* New Game */}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setMatchId(null);
                setPlayers([]);
                setNumPlayers("");
              }}
            >
              🆕 New Game
            </button>
          </div>

          {/* Score Table */}
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Total</th>
                <th>Status</th>
                <th>Add Score</th>
                <th>History</th>
                <th>Re-Entry</th>
              </tr>
            </thead>

            <tbody>
              {players.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                  <td>{player.status}</td>

                  {/* Add Score */}
                  <td>
                    <input
                      type="number"
                      disabled={player.status === "OUT"}
                      placeholder="Score"
                      onKeyDown={async (e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const value = Number(e.target.value);
                          if (!value) return;

                          try {
                            const res = await addScore(
                              matchId,
                              index,
                              value
                            );
                            setPlayers(res.data.players);
                            e.target.value = "";
                          } catch {
                            alert("Failed to add score");
                          }
                        }
                      }}
                    />
                  </td>

                  {/* History */}
                  <td>
                    {Array.isArray(player.history) && player.history.length
                      ? player.history.join(", ")
                      : "-"}
                  </td>

                  {/* Re-Join */}
                  <td>
                    {player.status === "OUT" && (
                      <button
                        onClick={async () => {
                          try {
                            const res = await rejoinPlayer(
                              matchId,
                              index
                            );
                            setPlayers(res.data.players);
                          } catch {
                            alert("Rejoin failed");
                          }
                        }}
                      >
                        Re-Join
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;
