import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
  const { user, isPremium } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`spatial-header ${scrolled ? 'header-scrolled' : ''}`}>
      <nav className="spatial-nav-dock">
        <Link to="/" className="spatial-logo">
          <span className="logo-sparkle">✦</span>
          <span className="logo-text">Planfit</span>
          <span className="logo-genz-badge">AI 2.0</span>
        </Link>

        <button 
          className="spatial-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className={`burger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`burger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`burger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        <div className={`spatial-nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link 
            to="/articles" 
            className={`spatial-nav-item ${location.pathname === '/articles' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Articles</span>
          </Link>
          <Link 
            to="/exercises" 
            className={`spatial-nav-item ${location.pathname === '/exercises' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Exercises</span>
          </Link>
          <Link 
            to="/tools" 
            className={`spatial-nav-item ${location.pathname === '/tools' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>AI Tools</span>
            <span className="nav-hot-dot"></span>
          </Link>

          <div className="spatial-nav-actions">
            {!isPremium() && (
              <Link 
                to="/pricing" 
                className="spatial-cta-glow"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>⚡ Get Pro Plan</span>
              </Link>
            )}

            {!user ? (
              <Link 
                to="/login" 
                className="spatial-signin-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Sign in</span>
              </Link>
            ) : (
              <div className="spatial-profile-wrapper">
                <ProfileDropdown />
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
