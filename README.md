# Evangadi Forum

Evangadi Forum is a full-stack web application where users can ask questions and receive answers from other users. 
It serves as a collaborative platform for knowledge sharing. Users must create an account to post or answer questions, 
ensuring a community-driven and secure environment for discussions.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication**: Users can sign up, log in, and log out securely.
- **Ask Questions**: Registered users can post questions on the forum.
- **Answer Questions**: Other users can respond to questions.
- **Question and Answer Management**: Users can view, edit, and manage their own questions and answers.
- **Real-Time Updates**: Answers to questions are updated in real-time.
  
## Technologies Used
- **Frontend**:
  - React
  - CSS Modules
  - FontAwesome Icons
- **Backend**:
  - Node.js
  - Express.js
  - MySQL (with MySQL2 for database interaction)
- **Authentication**:
  - JSON Web Tokens (JWT)
- **Database**:
  - MySQL (used for managing users, questions, and answers)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/ephremdoyo/Evangadi-forum.git

2. Install the server dependency:
   ```bash
   npm install

3. Navigate into the project directory:
   ```
   cd client

4. Install the frontend dependency:
   ```
   npm install

5. Set up environment variables:
   Create a .env file in the server directory with the following information:
   ```
   DB_HOST=your-database-host
   DB_USER=your-database-username
   DB_PASS=your-database-password
   MYSQL_DB=your-database-name
   JWT_SECRET=your-jwt-secret

6. Start the development server:
   In the client directory, run:****
     ```
    npm run dev
  In the server directory, run:
  node app

7. Access the application in your browser at http://localhost:5500.


## Usage
1. Sign Up: Create a new account by filling in your details.
2. Ask Questions: Once logged in, you can post a question by clicking the "Ask Question" button.
3. Answer Questions: Browse available questions and provide answers to help other users.
4. Profile Management: Manage your questions, answers, and account information.

## API Endpoints
👉 POST /user/register: Register a new user
👉 POST /user/login: Log in a user
👉 GET /question: Get a list of all questions
👉 POST /question: Create a new question
👉 GET /answer/:questionID: Get answers for a specific question
👉 POST /answer: Submit an answer to a question

## Contributing
Contributions are welcome! If you’d like to contribute, please follow these steps:

👍 Fork the repository.
👍 Create a new branch (git checkout -b feature-branch).
👍 Make your changes.
👍 Commit your changes (git commit -m "Add some feature").
👍 Push to the branch (git push origin feature-branch).
👍 Open a pull request.
