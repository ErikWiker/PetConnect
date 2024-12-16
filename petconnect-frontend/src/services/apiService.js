import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

// Create an Axios instance 
const api = axios.create({ 
  baseURL: API_URL 
});

// Intercept response errors 
api.interceptors.response.use( 
  response => response, 
  error => { 
    const navigate = useNavigate(); 

    if (error.response && error.response.status === 401) { 
      // Token expired or unauthorized, clear the token and redirect to login 
      localStorage.removeItem('token'); 
      navigate('/login'); 
    } 
    
    return Promise.reject(error); 
  } 
);


// Get profile
export const getProfile = async () => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  if (!token) {
    throw new Error("Authentication token is missing"); 
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token for authentication
    },
  };

  try {
    const response = await axios.get(`${API_URL}/profile/user/profile`, config);
    return response.data; // Return the user's profile data
  } catch (err) {
    console.error('Error fetching user profile:', err); // Log any errors
    throw err; // Re-throw the error
  }
};

// Update profile
export const updateUserProfile = async (profileData) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  if (!token) {
    throw new Error("Authentication token is missing");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token for authentication
    },
  };

  try {
    const response = await axios.put(`${API_URL}/profile/user/profile`, profileData, config);
    return response.data;  // Return the updated profile data
  } catch (err) {
    console.error('Error updating user profile:', err); // Log any errors
    throw err; // Re-throw the error
  }
};

// Get all profiles
export const getProfiles = async () => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  if (!token) {
    throw new Error("Authentication token is missing"); 
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token for authentication
    },
  };

  try {
    const response = await axios.get(`${API_URL}/profile/users`, config); // API call to get all users
    return response.data; // Return the list of users
  } catch (err) {
    console.error('Error fetching users:', err); // Log any errors
    throw err; // Re-throw the error
  }
};


// Get all pets for the user 
export const getPets = async () => { 
  const token = localStorage.getItem('token'); 
  if (!token) { 
    throw new Error("Authentication token is missing");
  } 
  
  const config = { 
    headers: { 
      Authorization: `Bearer ${token}`,
    }, 
  }; 
  
  try { 
    const response = await axios.get(`${API_URL}/user/pets`, config); 
    return response.data; 
  } catch (err) { 
    console.error('Error fetching pets:', err); 
    throw err; 
  } 
}; 

// Add a new pet for the user 
export const addPet = async (petData) => { 
  const token = localStorage.getItem('token'); 
  if (!token) { 
    throw new Error("Authentication token is missing"); 
  } 
  const config = { 
    headers: { 
      Authorization: `Bearer ${token}`, 
  }, 
}; 

  try { const response = await axios.post(`${API_URL}/user/pets`, petData, config); 
  return response.data; 
  } catch (err) { 
    console.error('Error adding pet:', err); 
    throw err; 
  } 
};

// Get user profile by ID
export const getUserProfile = async (userId) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/profile/user/profile/${userId}`, config);
  return response.data;
};

// Get user pets by user ID
export const getUserPets = async (userId) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}/user/pets/${userId}`, config);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      // If the response status is 404, it means no pets were found. Return an empty array.
      return [];
    } else {
      // For any other errors, rethrow the error to be handled by the calling function.
      throw err;
    }
  }
};

