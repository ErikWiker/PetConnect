# PetConnect
A website to connect with other pet owners

#### Video Demo: [URL HERE]
#### Description:

PetConnect is a web application designed to help pet owners connect with each other and manage information about their pets. This project aims to create a user-friendly platform where users can register, manage their pets, view profiles of other users, and explore connections within the pet community. The idea is to allow people to find friends for their pets, friends for themselves, or even help with watching each others pets when owners go out of town. The application is developed using modern web technologies, ensuring a seamless and interactive user experience.

### Features

- **User Authentication and Authorization**: Users can register and log in to the platform securely. Authentication is implemented using JWT (JSON Web Tokens).
- **Manage Pets**: Users can add, edit, and delete information about their pets. Each pet can have details such as name, type, species, and age.
- **User Profiles**: Each user has a profile displaying their information and a list of their pets.
- **Connections**: Users can view profiles of other users and see the pets they own.
- **Responsive Design**: The application is designed to be responsive and mobile-friendly, ensuring accessibility across different devices.

### Project Structure

- **Backend**: 
  - Developed with Node.js and Express.js.
  - PostgreSQL is used as the database to store user and pet information.
  - Authentication and authorization are handled using JWT.
  - API endpoints are created to manage user data, pet data, and authentication.

- **Frontend**: 
  - Built with React.js.
  - Bootstrap is used for styling to ensure a consistent and responsive design.
  - Various components handle different parts of the application, such as user profiles, pet management, and navigation.

### Project Structure

#### Backend

- **/src/controllers/**
  - `authController.js`: Manages authentication-related actions such as login and registration.
  - `petController.js`: Handles operations related to pets, such as adding, updating, and deleting pets.
  - `profileController.js`: Manages user profile operations, such as fetching user profiles and their pets.

- **/src/middleware/**
  - `authenticateToken.js`: Middleware to verify JWT tokens and authenticate users.

- **/src/utils/**
  - `authUtils.js`: Utility functions for authentication, including password hashing and validation.

- **/src/models/**
  - `user.js`: Manages database operations related to users, such as creating user tables, adding users, and validating passwords (contains methods like `createUserTable`, `createUser`, `findUserByUsername`, `validatePassword`).

- **package.json and package-lock.json**: Contains backend dependencies and scripts to manage the project.
- **test-db.js**: Script for testing database interactions (currently unused).
- **server.js**: Entry point for the backend server, setting up Express and routing.

#### Frontend

- **/src/components/**
  - `Pets.js`: Component to manage and display pets.
  - `AllUsers.js`: Component to display all user profiles in a table format.
  - `Login.js`: Component for user login.
  - `NavBar.js`: Navigation bar component.
  - `PrivateRoute.js`: Component to handle private routes.
  - `Profile.js`: Component for user profiles.
  - `Register.js`: Component for user registration.
  - `UserProfile.js`: Component to display individual user profiles and their pets.

- **/public/**
  - `index.html`: Main HTML file.
  - `favicon.ico`, `manifest.json`, `robots.txt`, `logo.png`: Additional public assets and configuration files.

- **/src/**
  - `App.css`: CSS for the main application.
  - `App.js`: Main application component.
  - `App.test.js`: Tests for the main application component.
  - `index.css`: Global CSS styles.
  - `index.js`: Entry point for the React application.
  - `logo.svg`: Logo for the application.
  - `reportWebVitals.js`: Utility for measuring app performance.
  - `setupTests.js`: Configuration for setting up tests.
  - `craco.config.js`: Configuration for Create React App Configuration Override.
  - `package.json and package-lock.json`: Contains frontend dependencies and scripts to manage the project.
  - `README.md`: Unused readme file for the frontend (primary README is in the root directory).

- **/src/services/**
  - `authService.js`: Manages API calls related to authentication.

- **/src/styles/**
  - `styles/`: Directory containing CSS files for styling the application.

- **/src/utils/**
  - `tokenValidation.js`: Utility for validating JWT tokens.

#### Root

- **SQL/pets.sql**: SQL script to create the pets table.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **package.json and package-lock.json**: Contains root-level dependencies and scripts to manage the project.
- **README.md**: This readme file.

### Design Choices

- **Technology Stack**: 
  - The choice of React.js for the frontend provides a dynamic and responsive user interface. Node.js and Express.js on the backend allow for efficient handling of API requests and database interactions.
  - PostgreSQL was chosen for its robustness and ability to handle relational data efficiently.

- **Authentication**: 
  - JWT was chosen for authentication to provide a stateless and secure method for user authentication and authorization.

- **Styling**: 
  - Bootstrap was used for styling due to its simplicity and responsiveness. Custom CSS was added to address specific design requirements.

### How to Run

1. **Backend**:
   - Navigate to the `backend` directory.
   - Install dependencies: `npm install`.
   - Run the server: `npm start`.

2. **Frontend**:
   - Navigate to the `frontend` directory.
   - Install dependencies: `npm install`.
   - Start the React application: `npm start`.

3. **Database Setup**:
   - Ensure PostgreSQL is installed and running.
   - Create the database and set up the required tables (can use SQL scripts for this)

### Future Improvements

- Implement additional features such as messaging between users, advanced search filters, and notifications.
- Improve the UI/UX with more interactive elements and animations.
- Enhance security measures and conduct thorough testing.
- Write tests, and perform user testing.
- Refactor pet and profile route files to put logic into controllers for modular design.

### Conclusion

PetConnect aims to provide an engaging platform for pet owners to manage and explore pet-related information. This project showcases the integration of modern web technologies to build a comprehensive web application. The implementation of key features such as user management, pet management, and authentication highlights the project's capability to handle real-world use cases effectively. This also is to aid a real life problem my family is having - not having trusted friends that can watch pets or have pet playdates with.



