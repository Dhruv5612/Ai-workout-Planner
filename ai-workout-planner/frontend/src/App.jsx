import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Planner from './pages/Planner';
import ProfilePage from './pages/ProfilePage';
import StorePage from './pages/StorePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ExercisePage from './pages/ExercisePage';
import ArticlesPage from './pages/ArticlesPage';
import ToolsPage from './pages/ToolsPage';
import PricingPage from './pages/PricingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/exercises" element={<ExercisePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App; 