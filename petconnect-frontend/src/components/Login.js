// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom' // To redirect after login
import { loginUser } from '../services/authService';  // API call to log in the user

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email); //RegEx for email format to see if valid format

  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous error when user submits the form
    setError('');
    setIsLoading(true);

    if (!validateEmail(email)) { 
      setError('Please enter a valid email.'); 
      setIsLoading(false); 
      return; 
    } 
    //TODO: Make clientside match serverside validation
    if (password.length < 6) { 
      setError('Password should be at least 6 characters long.'); 
      setIsLoading(false); 
      return; 
    }

    // Call the login API
    try { 
      const data = await loginUser({ email, password }); 
      localStorage.setItem('token', data.token);  // Storing the JWT token in localStorage
      navigate('/profile'); 
    } catch (err) { 
      setError(err.response?.data?.error || 'Invalid email or password'); //More detailed error for debug
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => { 
    setError(''); 
    if (e.target.type === 'email') { 
    setEmail(e.target.value); 
    } else if (e.target.type === 'password') { 
    setPassword(e.target.value); 
    }
  };

  useEffect(() => { 
    // Redirect if user is already logged in 
    const token = localStorage.getItem('token'); 
    if (token) { 
      navigate('/profile'); 
    } 
  }, [navigate]);

  return ( 
  <div> 
    <h1>Login</h1> 
    {error && <div style={{ color: 'red' }}>{error}</div>} 
    <form onSubmit={handleLogin}> 
      <div> 
        <label>Email</label> 
        <input 
          type="email" 
          aria-label="Email"
          value={email} 
          onChange={handleChange} 
          required 
        /> 
      </div> 
      <div> 
        <label>Password</label> 
        <input 
          type="password" 
          aria-label="Password"
          value={password} 
          onChange={handleChange} 
          required 
        /> 
      </div> 
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
    <p>Don't have an account? <a href="/register">Register here!</a></p>
  </div>
  );
};
export default Login;
