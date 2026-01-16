import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './SharedHeader.css';
import { useAuth } from '../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';

const SharedHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { user, isPremium } = useAuth();

  const navigationItems = [
    { path: '/articles', name: 'Articles' },
    { path: '/exercises', name: 'Exercises' },
    { path: '/tools', name: 'Tools' }
  ];

  // Filter out the current page from navigation
  const filteredNavigation = navigationItems.filter(item => item.path !== currentPath);

  const handleGetPlanClick = () => {
    console.log('Button clicked, navigating to /pricing');
    navigate('/pricing');
  };

  return (
    <header className="shared-header">
      <nav className="shared-nav">
        <div className="shared-logo-container">
          <Link to="/" className="shared-logo-text">Planfit</Link>
        </div>
        
        <ul className="shared-nav-buttons">
          {filteredNavigation.map(item => (
            <li key={item.path} className="shared-nav-btn">
              <Link to={item.path} className="shared-nav-btn-text">
                {item.name}
              </Link>
            </li>
          ))}
          
          <li className="shared-nav-btn">
            <Link 
              to="/pricing"
              className={`shared-cta-btn ${isPremium() ? 'premium-active' : ''}`}
            >
              <span className="shared-nav-btn-text">
                {isPremium() ? 'Premium Active' : 'Get your plan now'}
              </span>
              {isPremium() && <span className="premium-badge">✓</span>}
            </Link>
          </li>

          {!user && (
            <li className="shared-nav-btn">
              <Link to="/login" className="shared-nav-btn-text">
                Sign in
              </Link>
            </li>
          )}

          {user && (
            <li className="shared-nav-btn">
              <ProfileDropdown />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default SharedHeader; 