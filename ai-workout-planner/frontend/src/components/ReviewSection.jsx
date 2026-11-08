import React, { useState } from 'react';
import './ReviewSection.css';

const ReviewSection = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      name: "Felipe @fit_felipe",
      role: "Calisthenics & Hypertrophy",
      text: "This app literally revolutionized how I approach progressive overload. With novel neural splits, crisp 3D instructions, and tempo coaching, Planfit completely dialed in my consistency. Best fitness investment no cap.",
      date: "Aug 11, 2024",
      tag: "🔥 Gained 4.2kg Lean Muscle"
    },
    {
      name: "Griffin Ehlers",
      role: "Cross-Training Enthusiast",
      text: "Was doubtful of an AI trainer actually understanding fatigue management, but the live adjustments during side kick burpees and RDLs blew my mind! Absolutely hooked on the daily splits.",
      date: "Aug 9, 2024",
      tag: "⚡ 52-Day Workout Streak"
    },
    {
      name: "Abubu @fit_bu",
      role: "Gym Beginner",
      text: "Recommends workout routines that are challenging but safe, manages rest timers dynamically, and has the cleanest spatial dark UI on the planet. I share my workout summaries on IG daily!",
      date: "Sep 7, 2024",
      tag: "🎯 -6% Body Fat in 60 Days"
    },
    {
      name: "Jeoyong K.",
      role: "Powerbuilding",
      text: "It's been 8 weeks since I locked in with Planfit. My squat increased by 25kg, body fat dropped from 28% to 19%, and I feel unstoppable. The AI meal planner is a cheat code.",
      date: "Dec 18, 2024",
      tag: "🏆 PR Smashed: 140kg Deadlift"
    }
  ];

  const StarRating = () => (
    <div className="spatial-star-rating">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="spatial-star">★</span>
      ))}
    </div>
  );

  return (
    <section className="spatial-review-section">
      <div className="spatial-review-container">
        <div className="review-header-block">
          <div className="genz-pill purple">
            <span>✦ REAL REPS • REAL RESULTS</span>
          </div>
          <h2 className="review-title">
            Loved By Over <span className="holo-aurora">1,000,000+</span> Fit Freaks
          </h2>
          <p className="review-subtitle">
            See how lifters are transforming their bodies and mindset with AI guidance.
          </p>
        </div>

        <div className="review-cards-wrapper">
          <div className="spatial-review-card glass-panel">
            <div className="review-top-meta">
              <StarRating />
              <span className="review-achievement-tag">{reviews[currentReview].tag}</span>
            </div>

            <p className="review-quote-text">“{reviews[currentReview].text}”</p>

            <div className="review-author-row">
              <div className="author-avatar-badge">
                {reviews[currentReview].name.charAt(0)}
              </div>
              <div className="author-details">
                <span className="author-name">{reviews[currentReview].name}</span>
                <span className="author-role">{reviews[currentReview].role} • {reviews[currentReview].date}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="review-pagination-dock">
          {reviews.map((_, index) => (
            <button 
              key={index}
              className={`pagination-spatial-pill ${index === currentReview ? 'active' : ''}`}
              onClick={() => setCurrentReview(index)}
              aria-label={`View review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
