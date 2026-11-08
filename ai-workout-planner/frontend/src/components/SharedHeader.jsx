import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SharedHeader.css';
import { useAuth } from '../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';

const SharedHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, isPremium } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { path: '/articles', name: 'Articles' },
    { path: '/exercises', name: 'Exercises' },
    { path: '/tools', name: 'AI Tools', hot: true }
  ];

  return (
    <header className={`spatial-shared-header ${scrolled ? 'header-scrolled' : ''}`}>
      <nav className="spatial-shared-dock">
        <Link to="/" className="spatial-shared-logo">
          <span className="logo-sparkle">✦</span>
          <span className="logo-text">Planfit</span>
          <span className="logo-genz-badge">AI 2.0</span>
        </Link>

        <button 
          className="spatial-shared-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className={`burger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`burger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`burger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        <div className={`spatial-shared-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {navigationItems.map(item => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`spatial-shared-item ${currentPath === item.path ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>{item.name}</span>
              {item.hot && <span className="nav-hot-dot"></span>}
            </Link>
          ))}

          <div className="spatial-shared-actions">
            <Link 
              to="/pricing"
              className={`spatial-plan-btn ${isPremium() ? 'premium-active-glow' : 'get-plan-glow'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>{isPremium() ? '✦ Pro Active' : '⚡ Get Pro Plan'}</span>
            </Link>

            {!user ? (
              <Link 
                to="/login" 
                className="spatial-shared-signin"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Sign in</span>
              </Link>
            ) : (
              <div className="spatial-shared-profile">
                <ProfileDropdown />
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default SharedHeader;
