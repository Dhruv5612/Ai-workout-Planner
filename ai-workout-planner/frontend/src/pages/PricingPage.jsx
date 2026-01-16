import React from 'react';
import SharedHeader from '../components/SharedHeader';
import './PricingPage.css';

const PricingPage = () => {
  return (
    <div className="pricing-page">
      <SharedHeader />
      <div className="pricing-container">
        <div className="pricing-header">
          <h1>Choose Your Plan</h1>
          <p>Get personalized AI-powered workout and meal plans tailored to your goals</p>
        </div>
        
        <div className="pricing-cards">
          <div className="pricing-card free">
            <div className="plan-header">
              <h3>Free</h3>
              <div className="price">$0</div>
              <p>Perfect for getting started</p>
            </div>
            <ul className="features-list">
              <li>✓ Basic BMI & Calorie Calculator</li>
              <li>✓ Workout Timer</li>
              <li>✓ One Rep Max Calculator</li>
              <li>✓ Basic Articles</li>
              <li>✓ Community Support</li>
            </ul>
            <button className="plan-btn free-btn" disabled>
              Current Plan
            </button>
          </div>
          
          <div className="pricing-card premium">
            <div className="plan-badge">Most Popular</div>
            <div className="plan-header">
              <h3>Premium</h3>
              <div className="price">
                <span className="monthly-price">$9.99</span>
                <span className="period">/month</span>
              </div>
              <p>Everything you need to reach your goals</p>
            </div>
            <ul className="features-list">
              <li>✓ AI Workout Generator</li>
              <li>✓ AI Meal Plan Generator</li>
              <li>✓ Advanced Progress Tracking</li>
              <li>✓ Unlimited Exercise Library</li>
              <li>✓ Expert Content & Tips</li>
              <li>✓ Priority 24/7 Support</li>
            </ul>
            <button className="plan-btn premium-btn">
              Start Monthly Plan
            </button>
            <p className="trial-text">7-day free trial • Cancel anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
