import React from 'react';
import { useAuth } from '../context/AuthContext';
import './PremiumComparison.css';

const PremiumComparison = ({ onClose, onUpgrade }) => {
  const { isPremium } = useAuth();

  const features = [
    {
      feature: 'AI Workout Generator',
      free: 'Basic workout plans',
      premium: 'Personalized AI workouts with progress tracking'
    },
    {
      feature: 'Meal Plan Generator',
      free: 'Basic meal suggestions',
      premium: 'Custom meal plans with macro tracking & recipes'
    },
    {
      feature: 'Progress Tracking',
      free: 'Basic BMI & calorie calculator',
      premium: 'Advanced analytics, body composition tracking'
    },
    {
      feature: 'Exercise Library',
      free: 'Limited exercises',
      premium: 'Unlimited exercises with video tutorials'
    },
    {
      feature: 'Expert Content',
      free: 'Basic articles',
      premium: 'Exclusive expert tips & nutrition guides'
    },
    {
      feature: 'Support',
      free: 'Community support',
      premium: 'Priority 24/7 support'
    }
  ];

  return (
    <div className="premium-overlay">
      <div className="premium-modal">
        <div className="premium-header">
          <h2>Choose Your Plan</h2>
          <button className="premium-close" onClick={onClose}>×</button>
        </div>
        
        <div className="premium-comparison">
          <div className="comparison-table">
            <div className="comparison-header">
              <div className="feature-column">Features</div>
              <div className="plan-column free">
                <div className="plan-name">Free</div>
                <div className="plan-price">$0</div>
              </div>
              <div className="plan-column premium">
                <div className="plan-name">Premium</div>
                <div className="plan-price">$9.99/month</div>
                <div className="plan-savings">Save 50% with yearly plan</div>
              </div>
            </div>
            
            {features.map((item, index) => (
              <div key={index} className="comparison-row">
                <div className="feature-name">{item.feature}</div>
                <div className="feature-free">
                  <span className="check">✓</span>
                  {item.free}
                </div>
                <div className="feature-premium">
                  <span className="check premium">✓</span>
                  {item.premium}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="premium-actions">
          {!isPremium() ? (
            <>
              <button className="premium-btn monthly" onClick={() => onUpgrade('monthly')}>
                Start Monthly Plan - $9.99/month
              </button>
              <button className="premium-btn yearly" onClick={() => onUpgrade('yearly')}>
                Start Yearly Plan - $59.99/year
                <span className="savings-badge">Save 50%</span>
              </button>
              <p className="trial-text">7-day free trial • Cancel anytime</p>
            </>
          ) : (
            <div className="premium-active">
              <p>✅ You're already a Premium member!</p>
              <button className="premium-btn" onClick={onClose}>
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PremiumComparison;
