import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            🌍 Welcome to <span className="gradient-text">Country Explorer</span>
          </h1>
          <p className="hero-subtitle">
            Discover the world through flags, test your knowledge, and compete with others in our interactive country learning platform.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">195+</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5</div>
              <div className="stat-label">Regions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Knowledge</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-flags">
            <div className="flag-emoji">🏳️</div>
            <div className="flag-emoji">🇺🇸</div>
            <div className="flag-emoji">🇫🇷</div>
            <div className="flag-emoji">🇯🇵</div>
            <div className="flag-emoji">🇧🇷</div>
            <div className="flag-emoji">🇦🇺</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="section-title">Explore Our Features</h2>
        <div className="features-grid">
          <Link to="/countries" className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3 className="feature-title">Study Countries</h3>
            <p className="feature-description">
              Browse through countries by region, learn about their flags, capitals, and more.
            </p>
            <div className="feature-arrow">→</div>
          </Link>

          <Link to="/collection" className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3 className="feature-title">My Collection</h3>
            <p className="feature-description">
              Save your favorite countries and build your personal collection.
            </p>
            <div className="feature-arrow">→</div>
          </Link>

          <Link to="/quiz" className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3 className="feature-title">Flag Quiz</h3>
            <p className="feature-description">
              Test your knowledge with our interactive flag recognition quiz.
            </p>
            <div className="feature-arrow">→</div>
          </Link>

          <Link to="/leaderboard" className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3 className="feature-title">Leaderboard</h3>
            <p className="feature-description">
              Compete with others and see how you rank in different regions.
            </p>
            <div className="feature-arrow">→</div>
          </Link>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Explore?</h2>
          <p className="cta-subtitle">Start your journey of discovery today!</p>
          <Link to="/countries" className="cta-button">
            🚀 Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
