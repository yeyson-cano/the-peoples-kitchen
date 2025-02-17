import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Menu from './pages/Menu';
import ProductDetails from './pages/ProductDetails';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Notice from './pages/Notice';
import Cart from './pages/Cart';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Redirect root to /menu */}
      <Route path="/" element={<Navigate to="/menu" replace />} />

      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/menu/:id" element={<ProductDetails />} />
      <Route path="/notice" element={<Notice />} />
      <Route path="/cart" element={<Cart />} />

      {/* Protected Admin Route */}
      <Route path="/dashboard" element={<PrivateRoute adminOnly><Dashboard /></PrivateRoute>} />
    </Routes>
  );
};

export default App;
