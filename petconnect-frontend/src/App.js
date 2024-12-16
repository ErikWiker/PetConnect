// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; 
import Profile from './components/Profile'; 
import AllUsers from './components/AllUsers';
import Pets from './components/Pets'
import UserProfile from './components/UserProfile'; 
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import { isValidToken } from './utils/tokenValidation';

// Helper function to check if user is logged in 
// TODO: OLD CODE const isLoggedIn = () => !!localStorage.getItem('token'); //TODO: fix so doesn't redirect to profile when token expires

// TODO: this or something connected may still be causing infinite loop.
const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return token && isValidToken(token); // Check if token is valid
};


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          {/* Check if user is logged in, if not, redirect to login */} 
          <Route path="/" element={<Navigate to={isLoggedIn() ? '/profile' : '/login'} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={ <PrivateRoute> <Profile /> </PrivateRoute> } />
          <Route path="/all-users" element={ <PrivateRoute> <AllUsers /> </PrivateRoute> } /> 
          <Route path="/pets" element={ <PrivateRoute> <Pets /> </PrivateRoute> } /> 
          <Route path="/user/:id" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


//TODO: Implmenet PrivateRoute Component, then add route to App.js
