import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Login user
export const loginUser = (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials) 
    .then(response => response.data)
    .catch(err => {
      const errorMessage = err.response?.data?.message || "An unexpected error occurred";
      return Promise.reject(errorMessage);
    });
};

// Register user
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/auth/signup`, userData) 
    .then(response => response.data)
    .catch(err => Promise.reject(err));
};
