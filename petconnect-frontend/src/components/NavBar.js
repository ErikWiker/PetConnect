import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { isValidToken, removeToken } from '../utils/tokenValidation';
import '../styles/NavBar.css'; // TODO: Add CSS file for styles

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const loggedIn = token && isValidToken(token);

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        {loggedIn ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/all-users">All Users</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
