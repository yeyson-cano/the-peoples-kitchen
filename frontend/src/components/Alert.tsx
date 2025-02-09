import React, { useEffect, useState } from 'react';
import sovietBanner from '../assets/images/soviet-alert.jpg';
import '../styles/Alert.css';

interface AlertProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number; // Time in milliseconds
}

const Alert: React.FC<AlertProps> = ({ message, type = 'info', duration = 4000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className={`alert-banner ${type}`}>
      <div className="alert-content">
        <img src={sovietBanner} alt="Soviet Welcome" className="alert-image" />
        <p>{message}</p>
      </div>
      <button className="alert-close" onClick={() => setVisible(false)}>✖</button>
    </div>
  );
};

export default Alert;
