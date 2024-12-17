import React, { useEffect, useState } from 'react';
import { getProfile, updateUserProfile } from "../services/apiService"; // Import the service functions for API calls
import { useNavigate } from 'react-router-dom'; // Import to navigate to other pages
import { removeToken } from '../utils/tokenValidation'
import '../styles/Profile.css'; // TODO: Optional: Custom styles

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    location: "",
  });
  const [isEditing, setIsEditing] = useState(false); // Boolean flag for toggling edit mode
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User not authenticated");
      navigate('/login'); // Redirect to login if user is not authenticated
      return;
    }

    // Call the function for getting the user profile
    getProfile()
      .then((data) => setProfile(data))
      .catch((err) => setError(err.response?.data?.error || "Error fetching profile"));
  }, [navigate]);

  const handleChange = (e) => {
    // Updates profile state when form inputs are changed
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    // Handles submission of updated profile to backend
    e.preventDefault();  
   // const token = localStorage.getItem("token"); // TODO: Unused??

    // Call the function for updating the profile
    updateUserProfile(profile)
      .then((updatedProfile) => {
        setProfile(updatedProfile);
        setIsEditing(false);
      })
      .catch((err) => setError(err.response?.data?.error || "Error updating profile"));
  };

  // **Logout function** 
  const handleLogout = () => { 
    removeToken(); // Remove token from localStorage 
    navigate('/login'); // Redirect to login page
  };

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center">User Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={profile.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={profile.location}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div className="profile-view">
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Location:</strong> {profile.location}</p>
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
          <button className="btn btn-info" onClick={() => navigate('/pets')}>View My Pets</button>
          <button className="btn btn-secondary" onClick={() => navigate('/all-users')}>View All Users</button>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Profile; // Export the component so it can be used in other parts of the app.
