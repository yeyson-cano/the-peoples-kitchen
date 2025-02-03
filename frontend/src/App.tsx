import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
