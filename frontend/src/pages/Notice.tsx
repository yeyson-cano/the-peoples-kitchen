import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Notice.css';

const Notice: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    message?: string;
    redirectTo?: string;
    buttonText?: string;
  } || {};

  return (
    <div className="notice-container">
      <h2>Notice</h2>
      <p>{state.message || 'Something happened, please take action.'}</p>
      <div className="notice-buttons">
        <button onClick={() => navigate('/login')} className="notice-button primary">Login</button>
        <button onClick={() => navigate('/register')} className="notice-button secondary">Register</button>
        {state.redirectTo && (
          <button 
            onClick={() => navigate(state.redirectTo || '/menu')} // Default to '/menu' if undefined
            className="notice-button neutral"
          >
            {state.buttonText || 'Go Back'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Notice;
