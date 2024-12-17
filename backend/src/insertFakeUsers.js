// Script to insert a bunch of fake users into the db

const { faker } = require('@faker-js/faker');
const db = require('./db/db'); // Adjust the path to your db connection file

const validPetTypes = ['dog', 'cat', 'reptile', 'amphibian', 'fish', 'small mammal', 'bird', 'insect', 'other'];

const createFakeUser = () => {
  return {
    username: faker.internet.username(),
    email: faker.internet.email(),
    location: faker.location.city(),
    password_hash: faker.internet.password()
  };
};

const createFakePet = (userId) => {
  const randomType = validPetTypes[Math.floor(Math.random() * validPetTypes.length)];
  return {
    userId,
    petName: faker.person.firstName(), // Updated to use faker.person
    type: randomType,
    species: faker.animal.type(), // Adjust to match your pet types if needed
    age: faker.number.int({ min: 1, max: 15 })
  };
};

const insertFakeUsersAndPets = async (numUsers, maxPetsPerUser) => {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    users.push(createFakeUser());
  }

  try {
    // Insert users
    for (const user of users) {
      const result = await db.query(
        'INSERT INTO users (username, email, location, password_hash) VALUES ($1, $2, $3, $4) RETURNING id',
        [user.username, user.email, user.location, user.password_hash]
      );
      const userId = result.rows[0].id;

      // Insert pets for each user with a random number of pets (between 1 and 3)
      const numPets = faker.number.int({ min: 1, max: maxPetsPerUser });
      for (let j = 0; j < numPets; j++) {
        const pet = createFakePet(userId);
        await db.query(
          'INSERT INTO pets (user_id, pet_name, type, species, age) VALUES ($1, $2, $3, $4, $5)',
          [pet.userId, pet.petName, pet.type, pet.species, pet.age]
        );
      }
    }
    console.log(`${numUsers} fake users and their pets inserted successfully!`);
  } catch (err) {
    console.error('Error inserting fake users and pets:', err);
  } finally {
    db.end();
  }
};

insertFakeUsersAndPets(15, 3); // Adjust the number of users and max pets per user as needed


// Run with: node insertFakeUsers.js