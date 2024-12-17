import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPets, addPet, updatePet, deletePet } from '../services/apiService';
import '../styles/Pets.css'; // Optional: Custom styles

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [petName, setPetName] = useState('');
  const [type, setType] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');
  const [editingPetId, setEditingPetId] = useState(null);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPets().then(setPets).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validTypes = ['dog', 'cat', 'reptile', 'amphibian', 'fish', 'small mammal', 'bird', 'insect', 'other'];

    if (!validTypes.includes(type.toLowerCase())) {
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
      setIsFormVisible(false); // Hide form after submission
    } catch (err) {
      setError(err.response?.data?.error || "Error adding/updating pet");
    }
  };

  const handleEdit = (pet) => {
    setPetName(pet.pet_name);
    setType(capitalizeEachWord(pet.type));
    setSpecies(pet.species);
    setAge(pet.age);
    setEditingPetId(pet.id);
    setIsFormVisible(true); // Show form for editing
  };

  const handleDelete = async (id) => {
    try {
      await deletePet(id);
      const updatedPets = await getPets();
      setPets(updatedPets);
    } catch (err) {
      setError(err.response?.data?.error || "Error deleting pet");
    }
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

  const capitalizeEachWord = (string) => {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Pets Page</h1>
      <h2 className="text-center mt-4">Existing Pets</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Pet Name</th>
            <th>Type</th>
            <th>Species</th>
            <th>Age</th>
            <th className="actions-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id}>
              <td>{pet.pet_name}</td>
              <td>{capitalizeEachWord(pet.type)}</td>
              <td>{pet.species}</td>
              <td>{pet.age}</td>
              <td className="actions">
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(pet)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(pet.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary mt-3" onClick={() => { resetForm(); setIsFormVisible(!isFormVisible); }}>
        {isFormVisible ? 'Hide Form' : 'Add New Pet'}
      </button>
      {isFormVisible && (
        <div className="mt-4">
          <h2 className="text-center">{editingPetId ? "Edit Pet" : "Add New Pet"}</h2>
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
        </div>
      )}
      <button className="btn btn-secondary mt-3" onClick={handleNavigate}>
        Back to Profile
      </button>
    </div>
  );
};

export default Pets;
