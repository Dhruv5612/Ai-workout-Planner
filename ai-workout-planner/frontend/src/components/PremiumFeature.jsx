import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PremiumComparison from './PremiumComparison';
import './PremiumFeature.css';

const PremiumFeature = ({ children, feature, preview = null }) => {
  const { isPremium } = useAuth();
  const [showComparison, setShowComparison] = useState(false);

  const handleUpgrade = (plan) => {
    // Mock upgrade - in real app, integrate with payment gateway
    console.log(`Upgrading to ${plan} plan`);
    // Simulate successful upgrade
    const mockSubscription = {
      status: 'active',
      plan: plan === 'monthly' ? 'premium_monthly' : 'premium_yearly',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + (plan === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString()
    };
    
    // Update subscription in context
    const { setSubscription } = useAuth();
    setSubscription(mockSubscription);
    
    setShowComparison(false);
    alert(`Welcome to Premium! You now have access to ${feature}.`);
  };

  if (isPremium()) {
    return children;
  }

  return (
    <>
      <div className="premium-feature">
        <div className="premium-overlay-content">
          <div className="premium-lock-icon">🔒</div>
          <h3>Premium Feature</h3>
          <p>This feature is available for Premium members only.</p>
          {preview && (
            <div className="premium-preview">
              <h4>Preview:</h4>
              {preview}
            </div>
          )}
          <button 
            className="premium-unlock-btn"
            onClick={() => setShowComparison(true)}
          >
            Upgrade to Premium
          </button>
        </div>
        <div className="premium-blur">
          {children}
        </div>
      </div>
      
      {showComparison && (
        <PremiumComparison 
          onClose={() => setShowComparison(false)}
          onUpgrade={handleUpgrade}
        />
      )}
    </>
  );
};

export default PremiumFeature;
