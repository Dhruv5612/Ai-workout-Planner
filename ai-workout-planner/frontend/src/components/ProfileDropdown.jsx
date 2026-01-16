import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './ProfileDropdown.css';

const ProfileDropdown = () => {
  const { user, setUser, setSubscription, isPremium } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setUser(null);
    setSubscription(null);
    setIsOpen(false);
    // Redirect to home page after logout
    window.location.href = '/';
  };

  const handleGetPremium = () => {
    // Navigate to pricing page
    setIsOpen(false);
    window.location.href = '/pricing';
  };

  if (!user) {
    return (
      <div className="profile-dropdown">
        <a href="/login" className="profile-button">
          Sign In
        </a>
      </div>
    );
  }

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button 
        className="profile-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {user.name || user.email}
        <span className="dropdown-arrow">▼</span>
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item">
            <span className="user-info">
              {user.name && <div className="user-name">{user.name}</div>}
              <div className="user-email">{user.email}</div>
            </span>
          </div>
          
          <div className="dropdown-divider"></div>
          
          {!isPremium() && (
            <button 
              className="dropdown-item premium-button"
              onClick={handleGetPremium}
            >
              Get Your Plan
            </button>
          )}
          
          <button 
            className="dropdown-item logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
