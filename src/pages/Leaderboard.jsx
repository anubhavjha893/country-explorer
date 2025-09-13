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

  const getRegionEmoji = (region) => {
    const emojis = {
      'Europe': '🇪🇺',
      'Asia': '🌏',
      'Oceania': '🌊',
      'Americas': '🌎',
      'Africa': '🌍'
    };
    return emojis[region] || '🌍';
  };

  const getMedalEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  const getTotalParticipants = () => {
    return Object.values(byRegion).reduce((total, region) => total + region.length, 0);
  };

  const getTopPlayer = () => {
    const allResults = Object.values(byRegion).flat();
    return allResults.sort((a, b) => b.points - a.points)[0];
  };

  return (
    <div className="leaderboard-container">
      {/* Header Section */}
      <div className="leaderboard-header">
        <h1 className="leaderboard-title">
          🏆 <span className="gradient-text">Global Leaderboard</span>
        </h1>
        <p className="leaderboard-subtitle">
          Compete with players from around the world and climb the ranks!
        </p>
        
        <div className="leaderboard-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <div className="stat-value">{getTotalParticipants()}</div>
              <div className="stat-label">Total Players</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <div className="stat-value">{getTopPlayer()?.points || 0}</div>
              <div className="stat-label">Highest Score</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🌍</div>
            <div className="stat-info">
              <div className="stat-value">5</div>
              <div className="stat-label">Regions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Player Highlight */}
      {getTopPlayer() && (
        <div className="top-player-card">
          <div className="crown">👑</div>
          <div className="top-player-info">
            <h3 className="top-player-title">Champion of the Day</h3>
            <div className="top-player-name">{getTopPlayer().username}</div>
            <div className="top-player-score">{getTopPlayer().points} points in {getTopPlayer().region}</div>
          </div>
        </div>
      )}

      {/* Regional Leaderboards */}
      <div className="regional-leaderboards">
        <h2 className="section-title">Regional Rankings</h2>
        <div className="regions-grid">
          {REGIONS.map(region => (
            <div key={region} className="region-card">
              <div className="region-header">
                <div className="region-emoji">{getRegionEmoji(region)}</div>
                <h3 className="region-name">{region}</h3>
                <div className="region-count">{byRegion[region].length} players</div>
              </div>
              
              <div className="region-leaderboard">
                {byRegion[region].length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">📊</div>
                    <p className="empty-text">No participants yet</p>
                    <p className="empty-subtext">Be the first to play in this region!</p>
                  </div>
                ) : (
                  <div className="players-list">
                    {byRegion[region].slice(0, 10).map((player, index) => (
                      <div key={index} className={`player-item ${index < 3 ? 'top-three' : ''}`}>
                        <div className="player-rank">
                          <span className="rank-emoji">{getMedalEmoji(index)}</span>
                        </div>
                        <div className="player-info">
                          <div className="player-name">{player.username}</div>
                          <div className="player-date">
                            {new Date(player.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="player-score">
                          <span className="score-value">{player.points}</span>
                          <span className="score-label">pts</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="leaderboard-cta">
        <div className="cta-content">
          <h3 className="cta-title">Ready to Compete?</h3>
          <p className="cta-subtitle">Take the quiz and see how you rank!</p>
          <a href="/quiz" className="cta-button">
            🧠 Take Quiz Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
