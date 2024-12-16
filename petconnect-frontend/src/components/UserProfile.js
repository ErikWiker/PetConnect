import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserProfile, getUserPets } from '../services/apiService';

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
        
        // Try fetching pets, hadnle empty response
      try {
        const userPets = await getUserPets(id);
        setPets(userPets);
      } catch (err) {
        console.error("Error fetching pets:", err);
        // If fetching pets fails, don't set a general error 
        // TODO: Handle differently?
      }
    };
  
    fetchProfileAndPets();
  }, [id]);
  

  const handleBack = () => {
    navigate('/all-users');
  };

  return (
    <div>
      <h1>User Profile</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {profile && (
        <table>
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Username</td>
              <td>{profile.username}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{profile.email}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{profile.location}</td>
            </tr>
            {/* TODO: Add more profile attributes as needed, but will need to expand SQL as well */}
          </tbody>
        </table>
      )}
      <h2>User Pets</h2>
      {pets.length > 0 ? (
        <table>
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
                <td>{pet.petName}</td>
                <td>{pet.type}</td>
                <td>{pet.species}</td>
                <td>{pet.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No pets found for this user.</div>
      )}
      <button onClick={handleBack}>Back to All Users</button>
    </div>
  );
};

export default UserProfile;
