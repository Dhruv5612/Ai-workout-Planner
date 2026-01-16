import React from 'react';
import './SocialProofSection.css';

const SocialProofSection = () => {
  return (
    <section className="social-proof-section">
      {/* Background image removed as requested */}
      <div className="social-proof-content">
        <p className="social-proof-description">
          Planfit have changed million of people's life in over 100 countries.
        </p>
        <ul className="stats-container">
          <li className="stat-item">
            <span className="stat-title">80,000,000 +</span>
            <span className="stat-desc">Workouts Logged</span>
          </li>
          <li className="stat-item">
            <span className="stat-title">1,000,000 +</span>
            <span className="stat-desc">App Users Worldwide</span>
          </li>
          <li className="stat-item">
            <span className="stat-title">4.9</span>
            <span className="stat-desc">Store Rating</span>
          </li>
        </ul>
        {/* Featured section removed as requested */}
      </div>
    </section>
  );
};

export default SocialProofSection; 