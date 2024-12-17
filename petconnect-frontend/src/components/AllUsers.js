import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfiles } from '../services/apiService';
import '../styles/AllUsers.css'; // Optional: Custom styles

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
    <div className="container mt-5">
      <h1 className="text-center">Connections</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.location || 'N/A'}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => handleViewProfile(user.id)}>
                  View Profile
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
