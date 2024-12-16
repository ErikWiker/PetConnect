import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPets, addPet } from '../services/apiService';

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [petName, setPetName] = useState('');
  const [type, setType] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getPets().then(setPets).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!['dog', 'cat', 'reptile', 'amphibian', 'fish', 'small mammal', 'bird', 'insect', 'other'].includes(type)) {
      setError("Invalid type");
      return;
    }

    try {
      await addPet({ petName, type, species, age });
      // Fetch updated pets list
      const updatedPets = await getPets();
      setPets(updatedPets);
    } catch (err) {
      setError(err.response?.data?.error || "Error adding pet");
    }
  };

  const handleNavigate = () => {
    navigate('/profile'); //TODO: Adjust path if necessary
  }

  return (
    <div>
      <h1>My Pets</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pet Name:</label>
          <input type="text" value={petName} onChange={(e) => setPetName(e.target.value)} required />
        </div>
        <div>
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select Type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="reptile">Reptile</option>
            <option value="amphibian">Amphibian</option>
            <option value="fish">Fish</option>
            <option value="small mammal">Small Mammal</option>
            <option value="bird">Bird</option>
            <option value="insect">Insect</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Species:</label>
          <input type="text" value={species} onChange={(e) => setSpecies(e.target.value)} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Add Pet</button>
      </form>
      <h2>Existing Pets</h2>
      <ul>
        {pets.map(pet => (
          <li key={pet.id}>{pet.pet_name} - {pet.type} - {pet.species} - Age: {pet.age}</li>
        ))}
      </ul>
      <button onClick={handleNavigate}>Back to Profile</button>
    </div>
  );
};

export default Pets;
