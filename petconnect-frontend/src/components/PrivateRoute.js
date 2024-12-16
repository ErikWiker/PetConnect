import React from 'react';
import { Navigate } from 'react-router-dom';
import { isValidToken } from '../utils/tokenValidation';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isTokenValid = token && isValidToken(token); // To validate token

  if (!isTokenValid) { 
    return <Navigate to="/login" />;
  }

  return children;

  // return token ? children : <Navigate to="/login" />; TODO: old code
};


export default PrivateRoute;
