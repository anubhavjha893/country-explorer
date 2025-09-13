import React from "react";
import { useAppContext } from "../contexts/useAppContext";

const REGIONS = ["Europe","Asia","Oceania","Americas","Africa"];

const Leaderboard = () => {
  const { quizResults } = useAppContext();

  // group by region
  const byRegion = REGIONS.reduce((acc, r) => {
    acc[r] = (quizResults || []).filter(q => q.region === r)
      .sort((a, b) => b.points - a.points);
    return acc;
  }, {});

  return (
    <div style={{ padding: 20 }}>
      <h2>Leaderboard</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 12, marginTop: 12 }}>
        {REGIONS.map(r => (
          <div key={r} style={{ padding: 12, borderRadius: 10, background: "var(--card-bg)" }}>
            <h4 style={{ marginTop: 0 }}>{r}</h4>
            {byRegion[r].length === 0 ? (
              <p style={{ color: "var(--muted)" }}>No participants yet</p>
            ) : (
              <ol style={{ paddingLeft: 18 }}>
                {byRegion[r].map((p, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>
                    <strong>{p.username}</strong> — {p.points} pts
                  </li>
                ))}
              </ol>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
