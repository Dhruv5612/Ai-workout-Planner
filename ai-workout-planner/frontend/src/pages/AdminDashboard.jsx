import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, [currentPage]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Fetch stats
      const statsResponse = await fetch('http://localhost:5000/api/admin/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const statsData = await statsResponse.json();
      if (statsData.success) {
        setStats(statsData.data);
      }

      // Fetch users
      const usersResponse = await fetch(`http://localhost:5000/api/admin/users?page=${currentPage}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const usersData = await usersResponse.json();
      if (usersData.success) {
        setUsers(usersData.data.users);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = async (userId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setSelectedUser(data.data.user);
        setShowUserModal(true);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const updateUserSubscription = async (userId, subscription) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/subscription`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subscription })
      });
      const data = await response.json();
      if (data.success) {
        setSelectedUser(data.data.user);
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setShowUserModal(false);
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    window.location.href = '/admin/login';
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-number">{stats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Premium Users</h3>
            <p className="stat-number">{stats.premiumUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Free Users</h3>
            <p className="stat-number">{stats.freeUsers}</p>
          </div>
          <div className="stat-card">
            <h3>New Users (30 days)</h3>
            <p className="stat-number">{stats.newUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Conversion Rate</h3>
            <p className="stat-number">{stats.conversionRate}%</p>
          </div>
        </div>
      )}

      <div className="users-section">
        <h2>Users Management</h2>
        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subscription</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name || 'N/A'}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`subscription-badge ${
                      user.subscription?.status === 'active' ? 'premium' : 'free'
                    }`}>
                      {user.subscription?.status === 'active' ? 'Premium' : 'Free'}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button 
                      onClick={() => handleUserClick(user._id)}
                      className="action-btn"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showUserModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>User Management</h3>
              <button onClick={() => setShowUserModal(false)} className="close-btn">×</button>
            </div>
            <div className="modal-content">
              <div className="user-info">
                <p><strong>Name:</strong> {selectedUser.name || 'N/A'}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Current Plan:</strong> 
                  <span className={`subscription-badge ${
                    selectedUser.subscription?.status === 'active' ? 'premium' : 'free'
                  }`}>
                    {selectedUser.subscription?.status === 'active' ? 'Premium' : 'Free'}
                  </span>
                </p>
              </div>
              
              <div className="subscription-actions">
                <h4>Update Subscription</h4>
                <div className="action-buttons">
                  <button 
                    onClick={() => updateUserSubscription(selectedUser._id, {
                      status: 'active',
                      plan: 'premium_monthly'
                    })}
                    className="upgrade-btn"
                  >
                    Upgrade to Premium
                  </button>
                  <button 
                    onClick={() => updateUserSubscription(selectedUser._id, {
                      status: 'inactive',
                      plan: 'free'
                    })}
                    className="downgrade-btn"
                  >
                    Downgrade to Free
                  </button>
                  <button 
                    onClick={() => deleteUser(selectedUser._id)}
                    className="delete-btn"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
