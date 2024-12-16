import React, { useEffect, useState } from 'react';
import { getProfile, updateUserProfile } from "../services/apiService"; // Import the service functions for API calls
import { useNavigate } from 'react-router-dom'; // Import to navigate to other pages

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
    localStorage.removeItem('token'); // Remove token from localStorage 
    navigate('/login'); // Redirect to login page
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>User Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
          <p>Location: {profile.location}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          <button onClick={() => navigate('/pets')}>View My Pets</button> 
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => navigate('/all-users')}>View All Users</button>
        </div>
      )}
      
    </div>
  );
};

export default Profile; // Export the component so it can be used in other parts of the app.
