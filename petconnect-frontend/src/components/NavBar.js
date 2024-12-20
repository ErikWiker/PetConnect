import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { isValidToken, removeToken } from '../utils/tokenValidation';
import '../styles/NavBar.css'; // TODO: For additional custom styles

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const loggedIn = token && isValidToken(token);

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">PetConnect</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {loggedIn ? (
            <>
              <li className="nav-item"><Link className="nav-link" to="/all-users">Connect!</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
              <li className="nav-item"><button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
