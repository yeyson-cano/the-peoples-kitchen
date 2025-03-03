import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/Login.css';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        setError('Invalid server response');
        return;
      }

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // Store the token and user name in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ name: data.user.name }));
      localStorage.setItem('showWelcomeAlert', 'true'); // Set flag for welcome alert
      localStorage.setItem('role', data.user.role);

      // Redirect the user based on their role
      navigate(data.user.role === 'admin' ? '/dashboard' : '/menu');
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Login</button>
      </form>

      <p className="redirect-text">
        Don't have an account? 
        <button className="register-link" onClick={() => navigate('/register')}>
          Register here
        </button>
      </p>
    </div>
  );
};

export default Login;
