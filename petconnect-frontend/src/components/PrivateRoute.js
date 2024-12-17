import React from 'react';
import { Navigate } from 'react-router-dom';
import { isValidToken } from '../utils/tokenValidation';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isTokenValid = token && isValidToken(token); // Validate token

  return isTokenValid ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
