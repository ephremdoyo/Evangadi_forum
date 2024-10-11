const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const dbConnection = require("../db/dbConfig");
const dotenv = require("dotenv");
dotenv.config();

// user register
async function register(req, res) {
  // check if the user provides all the information required
  const { username, first_name, last_name, email, password } = req.body;
  if (!email || !password || !first_name || !last_name || !username) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }
  // response if the input password less than 8 digit
  if (password.length < 8) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Password must be at least 8 characters",
    });
  }
  try {
    // check if the user already exists
    const [user] = await dbConnection.query(
      "SELECT username,userid FROM users WHERE username = ? or email = ?",
      [username, email]
    );
    // response if the user exists
    if (user.length > 0) {
      return res.status(StatusCodes.CONFLICT).json({
        error: "Conflict",
        message: "User already existed",
      });
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // insert the user to database
    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
      [username, first_name, last_name, email, hashedPassword]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// user login
async function login(req, res) {
  // destructure user input
  const { email, password } = req.body;
  // check if the user fulfill the required input
  if (!String(email).trim() || !String(password).trim()) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }

  try {
    // check the user if the user exists in the database
    const [userLogin] = await dbConnection.query(
      "SELECT email, userid, password, username FROM users WHERE email = ?",
      [email]
    );

    // response if the user doesn't exist
    if (userLogin.length === 0) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Unauthorized",
        message: "Invalid email or password",
      });
    }
    // compare the password
    const isPasswordValid = await bcrypt.compare(
      password,
      userLogin[0].password
    );
    // response if the user password doesn't match
    if (!isPasswordValid) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid email or password!" });
    }

    const username = userLogin[0].username;
    const userid = userLogin[0].userid;

    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(StatusCodes.OK)
      .json({ message: "User login successful", token, username });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// check user
async function checkUser(req, res) {
  const { username, userid } = req.user;
  // console.log(req.user);
  if (!username || !userid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "User information is incomplete" });
  }
  res.status(StatusCodes.OK).json({ message: "valid user", username, userid });
}

// export functions
module.exports = { register, login, checkUser };
