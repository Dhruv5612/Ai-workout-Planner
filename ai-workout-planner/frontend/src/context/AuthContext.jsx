import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedSubscription = localStorage.getItem('subscription');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // If subscription not separately stored, derive from user payload
        if (!storedSubscription && parsedUser && parsedUser.subscription) {
          setSubscription(parsedUser.subscription);
          localStorage.setItem('subscription', JSON.stringify(parsedUser.subscription));
        }
      }
      if (storedSubscription) {
        setSubscription(JSON.parse(storedSubscription));
      }
    } catch (_e) {
      // ignore
    }
  }, []);

  const value = {
    user,
    setUser: (nextUser) => {
      setUser(nextUser);
      if (nextUser) {
        localStorage.setItem('user', JSON.stringify(nextUser));
        // Auto-sync subscription when present on user payload
        if (nextUser.subscription) {
          setSubscription(nextUser.subscription);
          localStorage.setItem('subscription', JSON.stringify(nextUser.subscription));
        }
      } else {
        localStorage.removeItem('user');
      }
    },
    subscription,
    setSubscription: (nextSubscription) => {
      setSubscription(nextSubscription);
      if (nextSubscription) {
        localStorage.setItem('subscription', JSON.stringify(nextSubscription));
      } else {
        localStorage.removeItem('subscription');
      }
    },
    isPremium: () => {
      // Hardcoded whitelist for complimentary premium access
      const premiumWhitelist = ['dhruvkamariya7@gmail.com'];
      if (user && premiumWhitelist.includes(user.email)) {
        return true;
      }

      const sub = subscription || (user && user.subscription) || null;
      if (!sub) return false;
      if (sub.status !== 'active') return false;
      // Accept 'premium' (backend) and legacy 'premium_monthly/yearly'
      const allowedPlans = ['premium', 'premium_monthly', 'premium_yearly', 'pro'];
      const planOk = allowedPlans.includes(sub.plan);
      if (!planOk) return false;
      if (!sub.expiresAt) return true;
      try {
        return new Date(sub.expiresAt) > new Date();
      } catch (_e) {
        return true;
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};


