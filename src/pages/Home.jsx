import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Welcome to Country Explorer</h1>
      <p style={{ marginBottom: 20, color: "var(--muted)" }}>
        Study countries, save favorites, play the flags quiz, and check region leaderboards.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12 }}>
        <Link to="/countries" className="card">Study countries</Link>
        <Link to="/collection" className="card">Collection</Link>
        <Link to="/quiz" className="card">Quiz</Link>
        <Link to="/leaderboard" className="card">Leaderboard</Link>
      </div>
    </div>
  );
};

export default Home;
