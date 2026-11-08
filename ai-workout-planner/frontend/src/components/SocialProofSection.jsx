import React from 'react';
import './SocialProofSection.css';

const SocialProofSection = () => {
  return (
    <section className="spatial-proof-section">
      <div className="spatial-proof-container">
        <div className="proof-header-block">
          <div className="genz-pill pink">
            <span>✦ GLOBAL FIT FAM • 100+ COUNTRIES</span>
          </div>
          <h2 className="proof-headline">
            Crushing Limits & Fueling Gains <span className="holo-pink">Worldwide</span>
          </h2>
          <p className="proof-sub">
            Real progress backed by millions of reps, data-driven overload, and AI coaching.
          </p>
        </div>

        <div className="spatial-stats-grid">
          <div className="stat-glass-card glass-panel">
            <div className="stat-icon-wrap">⚡</div>
            <div className="stat-number holo-aurora">80M+</div>
            <div className="stat-label">Workouts Logged</div>
            <p className="stat-detail">Personalized routines executed with precision form</p>
          </div>

          <div className="stat-glass-card glass-panel active-highlight">
            <div className="stat-badge-top">🔥 VIRAL ON TIKTOK</div>
            <div className="stat-icon-wrap">🚀</div>
            <div className="stat-number holo-text">1.2M+</div>
            <div className="stat-label">Active Lifters</div>
            <p className="stat-detail">Daily streaks maintained across all fitness levels</p>
          </div>

          <div className="stat-glass-card glass-panel">
            <div className="stat-icon-wrap">⭐</div>
            <div className="stat-number holo-text">4.9 / 5</div>
            <div className="stat-label">Community Rating</div>
            <p className="stat-detail">Over 75,000+ verified five-star gym rat reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
