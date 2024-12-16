import { jwtDecode } from 'jwt-decode';

// Utility functions for token management

export const isValidToken = (token) => {
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp > currentTime;
  } catch (e) {
    console.error("Invalid token:", e);
    return false;
  }
};

export const removeToken = () => {
  localStorage.removeItem('token');
};





//TODO: OLD CODE

/*
export const isValidToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode token payload
      const isExpired = payload.exp < Date.now() / 1000; // Check expiration time
      return !isExpired;
    } catch (error) {
      console.error("Invalid token", error);
      return false;
    }
  };
  */