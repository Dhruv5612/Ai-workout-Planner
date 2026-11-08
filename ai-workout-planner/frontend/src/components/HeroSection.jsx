import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="spatial-hero">
      {/* Ambient background glows */}
      <div className="hero-ambient-glow glow-cyan"></div>
      <div className="hero-ambient-glow glow-purple"></div>
      <div className="hero-ambient-glow glow-pink"></div>

      <div className="spatial-hero-container">
        {/* Left Column: Gen-Z Copy & Actions */}
        <div className="spatial-hero-text">
          <div className="genz-pill">
            <span className="pill-dot"></span>
            <span>NEXT-GEN AI FITNESS 2.0 ✦ LOCKED IN</span>
          </div>

          <h1 className="spatial-hero-title">
            Hyper-Personalized <br />
            <span className="holo-aurora">AI Workouts</span> Built <br />
            For Your Gains.
          </h1>

          <p className="spatial-hero-sub">
            Say goodbye to boring templates. Our neural fitness engine crafts adaptive daily splits, real-time rep guidance, and macro-tuned meals tailored to your exact gym gear and vibe. Zero fluff. Pure results.
          </p>

          <div className="spatial-hero-cta-group">
            <Link to="/tools" className="spatial-btn-primary">
              <span>⚡ Generate AI Split</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/pricing" className="spatial-btn-glass">
              <span>✦ Get Pro Plan</span>
            </Link>
          </div>

          <div className="hero-proof-strip">
            <div className="avatar-group">
              <span className="avatar-pill">🔥</span>
              <span className="avatar-pill">⚡</span>
              <span className="avatar-pill">💪</span>
              <span className="avatar-pill">🎯</span>
            </div>
            <div className="proof-text">
              <strong>1,000,000+</strong> lifters leveling up worldwide • <span className="highlight-tag">4.9 ★ Rating</span>
            </div>
          </div>
        </div>

        {/* Right Column: Spatial 3D Glass Floating UI Display */}
        <div className="spatial-hero-visual">
          {/* Main Spatial Glass Card */}
          <div className="spatial-hub-card glass-panel">
            <div className="hub-card-header">
              <div className="hub-status-pill">
                <span className="status-blink"></span>
                <span>AI TRAINER ACTIVE</span>
              </div>
              <span className="hub-time">DAY 14 / 30</span>
            </div>

            <div className="hub-exercise-preview">
              <div className="exercise-icon-badge">🏋️‍♂️</div>
              <div className="exercise-info">
                <h4>Incline Dumbbell Press</h4>
                <p>Chest & Front Delts • Hypertrophy Split</p>
              </div>
              <span className="genz-pill purple">SET 3 / 4</span>
            </div>

            {/* Live Progress Bar with Neon Liquid Fill */}
            <div className="hub-metric-row">
              <div className="metric-box">
                <span className="metric-label">WEIGHT</span>
                <span className="metric-val">28 <small>kg</small></span>
              </div>
              <div className="metric-box">
                <span className="metric-label">TARGET REPS</span>
                <span className="metric-val">10 <small>reps</small></span>
              </div>
              <div className="metric-box">
                <span className="metric-label">FORM ACCURACY</span>
                <span className="metric-val neon-accent">99.4%</span>
              </div>
            </div>

            <div className="hub-ai-quote">
              <span className="ai-sparkle">✦</span>
              <p>“Slight pause at the stretch. Control the eccentric phase for max chest activation.”</p>
            </div>
          </div>

          {/* Floating Spatial Satellite Card 1 */}
          <div className="spatial-floating-tag tag-streak glass-panel">
            <span className="tag-emoji">🔥</span>
            <div>
              <strong>7 Day Streak</strong>
              <small>Locked in • +250 XP</small>
            </div>
          </div>

          {/* Floating Spatial Satellite Card 2 */}
          <div className="spatial-floating-tag tag-macros glass-panel">
            <span className="tag-emoji">🥑</span>
            <div>
              <strong>Macros Synced</strong>
              <small>185g Protein • Target Hit</small>
            </div>
          </div>

          {/* Floating Spatial Satellite Card 3 */}
          <div className="spatial-floating-tag tag-bpm glass-panel">
            <span className="tag-emoji">⚡</span>
            <div>
              <strong>Peak Intensity</strong>
              <small>Zone 4 • 640 kcal burnt</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
