import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps): ReactElement => {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
