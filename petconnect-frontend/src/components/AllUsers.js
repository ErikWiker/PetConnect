import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfiles } from '../services/apiService';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getProfiles()
      .then(data => {
        console.log("Fetched users:", data); // Log to verify data
        setUsers(data);
      })
      .catch(err => {
        console.error("Error fetching users:", err); // Log errors
        setError(err.response?.data?.error || "Error fetching users");
      });
  }, []);

  const handleViewProfile = (id) => { navigate(`/user/${id}`); };

  return (
    <div>
      <h1>All Users</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.location || 'N/A'}</td>
              <td><button onClick={() => handleViewProfile(user.id)}>View Profile</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
