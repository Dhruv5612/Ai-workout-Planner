import React from 'react';
import SharedHeader from '../components/SharedHeader';
import { useAuth } from '../context/AuthContext';
import './PricingPage.css';

const PricingPage = () => {
  const { isPremium, setSubscription } = useAuth();

  const handleUpgrade = (planType) => {
    // Enable premium in auth context
    if (setSubscription) {
      setSubscription({
        plan: planType,
        status: 'active',
        startDate: new Date().toISOString()
      });
    }
  };

  return (
    <div className="pricing-page">
      <SharedHeader />
      
      <div className="pricing-ambient-glow glow-1"></div>
      <div className="pricing-ambient-glow glow-2"></div>

      <div className="pricing-container">
        <div className="pricing-header">
          <div className="genz-pill">
            <span>✦ ZERO EXCUSES • 100% GAINS</span>
          </div>
          <h1>Choose Your <span className="holo-aurora">Upgrade</span></h1>
          <p>Get personalized AI-powered workout splits, posture correction, and macro meal plans tailored to your goals.</p>
        </div>

        {isPremium() ? (
          <div className="spatial-premium-active-card glass-panel">
            <div className="active-crown">👑</div>
            <div className="genz-pill purple">PRO STATUS ACTIVE</div>
            <h2>You're On The Premium Tier</h2>
            <p>Your AI neural engine is fully unlocked with unlimited splits and meal planning.</p>
            <div className="active-perks-grid">
              <div className="perk-chip">✓ Unlimited AI Workouts</div>
              <div className="perk-chip">✓ Custom Macro Generator</div>
              <div className="perk-chip">✓ 24/7 AI Trainer Chat</div>
              <div className="perk-chip">✓ Spatial Form Guidance</div>
            </div>
          </div>
        ) : (
          <div className="pricing-cards">
            {/* Free Tier */}
            <div className="pricing-card free glass-panel">
              <div className="plan-header">
                <div className="plan-level-pill">STARTER</div>
                <h3>Free Tier</h3>
                <div className="price">
                  <span className="price-num">$0</span>
                  <span className="period">/forever</span>
                </div>
                <p>Essential fitness tools to calculate stats and stay active.</p>
              </div>

              <div className="plan-divider"></div>

              <ul className="features-list">
                <li><span className="check-icon">✓</span> Basic BMI & Calorie Calculator</li>
                <li><span className="check-icon">✓</span> Workout Interval Stopwatch</li>
                <li><span className="check-icon">✓</span> One Rep Max Estimator</li>
                <li><span className="check-icon">✓</span> Standard Exercise Library</li>
                <li><span className="check-icon">✓</span> Community Articles Feed</li>
              </ul>

              <button className="plan-btn free-btn" disabled>
                Active Default Plan
              </button>
            </div>
            
            {/* Premium Pro Tier */}
            <div className="pricing-card premium glass-panel spatial-featured">
              <div className="plan-badge">🔥 MOST POPULAR • 7-DAY FREE TRIAL</div>

              <div className="plan-header">
                <div className="plan-level-pill pro">PRO UNLIMITED</div>
                <h3>Planfit AI Pro</h3>
                <div className="price">
                  <span className="price-num holo-aurora">$9.99</span>
                  <span className="period">/month</span>
                </div>
                <p>Everything you need to unlock rapid muscle growth and fat loss.</p>
              </div>

              <div className="plan-divider"></div>

              <ul className="features-list">
                <li><span className="check-icon pro">✦</span> <strong>Full AI Workout Split Generator</strong></li>
                <li><span className="check-icon pro">✦</span> <strong>AI Macro Meal Planner</strong></li>
                <li><span className="check-icon pro">✦</span> Real-Time Adaptive Volume & Overload</li>
                <li><span className="check-icon pro">✦</span> Complete 3D Exercise Video Guides</li>
                <li><span className="check-icon pro">✦</span> Personalized Recovery & Fatigue Tracking</li>
                <li><span className="check-icon pro">✦</span> VIP Discord Community & Priority Support</li>
              </ul>

              <button 
                className="plan-btn premium-btn spatial-btn-primary"
                onClick={() => handleUpgrade('monthly')}
              >
                <span>⚡ Start 7-Day Free Trial</span>
              </button>
              <p className="trial-text">Instant activation • Cancel anytime with 1-click</p>
            </div>
          </div>
        )}

        {/* Comparison Section */}
        <div className="comparison-section">
          <h2>Compare Feature <span className="holo-text">Breakdown</span></h2>
          <div className="comparison-table glass-panel">
            <div className="comparison-header">
              <div className="feature-column">Features & Capabilities</div>
              <div className="plan-column">Free Tier</div>
              <div className="plan-column pro-col">Planfit Pro ✦</div>
            </div>

            <div className="comparison-row">
              <div className="feature-name">AI Routine Generation</div>
              <div className="feature-free">—</div>
              <div className="feature-premium check">✓ Unlimited</div>
            </div>

            <div className="comparison-row">
              <div className="feature-name">Personalized Macro Meals</div>
              <div className="feature-free">—</div>
              <div className="feature-premium check">✓ Fully Customized</div>
            </div>

            <div className="comparison-row">
              <div className="feature-name">Calorie & BMI Tools</div>
              <div className="feature-free check">✓ Included</div>
              <div className="feature-premium check">✓ Enhanced Mode</div>
            </div>

            <div className="comparison-row">
              <div className="feature-name">Fatigue & Deload AI Monitor</div>
              <div className="feature-free">—</div>
              <div className="feature-premium check">✓ Included</div>
            </div>

            <div className="comparison-row">
              <div className="feature-name">Priority 24/7 Trainer Bot</div>
              <div className="feature-free">—</div>
              <div className="feature-premium check">✓ Included</div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="faq-section">
          <h2>Frequently Asked <span className="holo-pink">Questions</span></h2>
          <div className="faq-grid">
            <div className="faq-item glass-panel">
              <h3>⚡ How does the 7-day free trial work?</h3>
              <p>You get instant full access to AI split generation and meal planning. You won't be charged if you cancel before day 7.</p>
            </div>
            <div className="faq-item glass-panel">
              <h3>🎯 Can I switch my workout goals anytime?</h3>
              <p>Yes! Whether you're cutting, lean bulking, or training for an athletic marathon, the AI adapts on the fly.</p>
            </div>
            <div className="faq-item glass-panel">
              <h3>🏋️ Does it work for home workouts with dumbbells?</h3>
              <p>100%. You can select exactly what equipment you own—from full commercial gyms to bodyweight-only setups.</p>
            </div>
            <div className="faq-item glass-panel">
              <h3>🔒 How secure is my billing and data?</h3>
              <p>Bank-grade 256-bit SSL encryption. We never sell your personal metrics or workout histories.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
