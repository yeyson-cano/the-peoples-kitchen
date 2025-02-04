import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await fetch('http://localhost/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Remove token and redirect to login
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard!</h2>
      <p>You are successfully logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
