import React, { useState } from "react";
import {
  startMatch,
  addScore,
  rejoinPlayer,
  resetMatch
} from "./api/matchapi"; // ✅ correct file name
import "./App.css";

function App() {
  const [numPlayers, setNumPlayers] = useState("");
  const [players, setPlayers] = useState([]);
  const [matchId, setMatchId] = useState(null);

  return (
    <div className="container">
      <h1>🎴 Rummy Score Tracker</h1>

      {/* Number of Players */}
      {!matchId && (
        <div className="section">
          <label>Number of Players:</label>
          <input
            type="number"
            value={numPlayers}
            onChange={(e) => setNumPlayers(e.target.value)}
          />
        </div>
      )}

      {/* Player Names */}
      {!matchId && numPlayers > 0 && (
        <div className="section">
          <h3>Enter Player Names</h3>

          {[...Array(Number(numPlayers))].map((_, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Player ${index + 1} name`}
              onChange={(e) => {
                const updated = [...players];
                updated[index] = { name: e.target.value };
                setPlayers(updated);
              }}
            />
          ))}
        </div>
      )}

      {/* Start Match */}
      {!matchId && players.length === Number(numPlayers) && (
        <button
          onClick={async () => {
  const names = players.map(p => p.name?.trim());

  if (names.some(name => !name)) {
    alert("Please enter all player names");
    return;
  }

  try {
    const res = await startMatch(names);
    setPlayers(res.data.players);
    setMatchId(res.data._id);
  } catch (err) {
    console.error(err);
    alert("Failed to start match");
  }
}}

        >
          ▶ Start Match
        </button>
      )}

      {/* Match Controls */}
      {matchId && (
        <div className="section">
          <button
            onClick={async () => {
              const res = await resetMatch(matchId);
              setPlayers(res.data.players);
            }}
          >
            🔄 New Match
          </button>

          <button
            onClick={() => {
              setMatchId(null);
              setPlayers([]);
              setNumPlayers("");
            }}
            style={{ marginLeft: "10px" }}
          >
            ❌ End Game
          </button>
        </div>
      )}

      {/* Score Table */}
      {matchId && (
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
                        const value = Number(e.target.value);
                        if (!value) return;

                        const res = await addScore(
                          matchId,
                          index,
                          value
                        );
                        setPlayers(res.data.players);
                        e.target.value = "";
                      }
                    }}
                  />
                </td>

                {/* History */}
                <td>
                  {player.history.length > 0
                    ? player.history.join(", ")
                    : "-"}
                </td>

                {/* Re-Entry */}
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
                        } catch (err) {
                          alert(err.response.data.message);
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
      )}
    </div>
  );
}

export default App;
