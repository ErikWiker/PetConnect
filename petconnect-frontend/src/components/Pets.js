import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPets, addPet, updatePet } from '../services/apiService';
import '../styles/Pets.css'; // Optional: Custom styles

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [petName, setPetName] = useState('');
  const [type, setType] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');
  const [editingPetId, setEditingPetId] = useState(null);
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
      if (editingPetId) {
        await updatePet(editingPetId, { petName, type, species, age });
        setEditingPetId(null);
      } else {
        await addPet({ petName, type, species, age });
      }
      const updatedPets = await getPets();
      setPets(updatedPets);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || "Error adding/updating pet");
    }
  };

  const handleEdit = (pet) => {
    setPetName(pet.pet_name);
    setType(pet.type);
    setSpecies(pet.species);
    setAge(pet.age);
    setEditingPetId(pet.id);
  };

  const resetForm = () => {
    setPetName('');
    setType('');
    setSpecies('');
    setAge('');
    setEditingPetId(null);
  };

  const handleNavigate = () => {
    navigate('/profile');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Pets Page</h1>
      <h2 className="text-center mt-4">Existing Pets</h2>
      <ul className="list-group">
        {pets.map((pet) => (
          <li key={pet.id} className="list-group-item">
            {pet.pet_name} - {pet.type} - {pet.species} - Age: {pet.age}
            <button className="btn btn-warning btn-sm float-right" onClick={() => handleEdit(pet)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-center mt-4">Add New Pet</h2>
      <form onSubmit={handleSubmit} className="pet-form">
        <div className="form-group">
          <label>Pet Name:</label>
          <input
            type="text"
            className="form-control"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <select
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
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
        <div className="form-group">
          <label>Species:</label>
          <input
            type="text"
            className="form-control"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          {editingPetId ? "Update Pet" : "Add Pet"}
        </button>
        {editingPetId && (
          <button type="button" className="btn btn-secondary" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>
      <button className="btn btn-secondary mt-3" onClick={handleNavigate}>
        Back to Profile
      </button>
    </div>
  );
};

export default Pets;
