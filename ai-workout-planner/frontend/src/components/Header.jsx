import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
  const { user, isPremium } = useAuth();
  return (
    <header className="header">
      <nav className="nav">
        <div className="logo-container">
          <span className="logo-text">Planfit</span>
        </div>
        <ul className="nav-buttons">
          <li className="nav-btn">
            <Link to="/articles" className="nav-btn-text">
              Articles
            </Link>
          </li>
          <li className="nav-btn">
            <Link to="/exercises" className="nav-btn-text">
              Exercises
            </Link>
          </li>
          <li className="nav-btn">
            <Link to="/tools" className="nav-btn-text">
              Tools
            </Link>
          </li>

          {!isPremium() && (
            <li className="nav-btn">
              <Link to="/pricing" className="cta-btn">
                <span className="nav-btn-text">Get your plan now</span>
              </Link>
            </li>
          )}
          {!user && (
            <li className="nav-btn">
              <Link to="/login" className="nav-btn-text">
                Sign in
              </Link>
            </li>
          )}
          {user && (
            <li className="nav-btn">
              <ProfileDropdown />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header; 