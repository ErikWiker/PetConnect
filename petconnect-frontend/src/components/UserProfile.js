import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserProfile, getUserPets } from '../services/apiService';
import '../styles/UserProfile.css'; // Optional: Custom styles

const UserProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndPets = async () => {
      try {
        const userProfile = await getUserProfile(id);
        setProfile(userProfile);
      } catch (err) {
        console.error("Error fetching user profile", err);
        setError("Error fetching user profile. Please try again later.");
      }
        
      try {
        const userPets = await getUserPets(id);
        console.log("Fetched user pets:", userPets); // Log to verify data
        setPets(userPets);
      } catch (err) {
        console.error("Error fetching pets:", err);
        // Handle pet fetching error separately
      }
    };
  
    fetchProfileAndPets();
  }, [id]);

  const handleBack = () => {
    navigate('/all-users');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">User Profile</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {profile && (
        <div className="card mb-4">
          <div className="card-body">
            <table className="table">
              <tbody>
                <tr>
                  <td><strong>Username</strong></td>
                  <td>{profile.username}</td>
                </tr>
                <tr>
                  <td><strong>Email</strong></td>
                  <td>{profile.email}</td>
                </tr>
                <tr>
                  <td><strong>Location</strong></td>
                  <td>{profile.location}</td>
                </tr>
                {/* Add more profile attributes as needed */}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <h2 className="text-center">User Pets</h2>
      {pets.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Type</th>
              <th>Species</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {pets.map(pet => (
              <tr key={pet.id}>
                <td>{pet.petname}</td>
                <td>{capitalizeEachWord(pet.type)}</td>
                <td>{pet.species}</td>
                <td>{pet.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info text-center">No pets found for this user.</div>
      )}
      <button className="btn btn-secondary mt-3" onClick={handleBack}>
        Back to All Users
      </button>
    </div>
  );
};

const capitalizeEachWord = (string) => {
  return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default UserProfile;
