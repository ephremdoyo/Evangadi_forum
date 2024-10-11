const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");

// Get All Questions
async function allQuestions(req, res) {
  try {
    // select questions from the db
    const [allQuestionsData] = await dbConnection.query(
      "SELECT  questions.questionid AS question_id, questions.title, questions.description AS content,  users.username AS user_name, questions.create_at FROM questions JOIN users ON questions.userid = users.userid ORDER BY questions.id DESC"
    );

    // check if the db has a question
    if (allQuestionsData.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "No questions found.",
      });
    }

    // response for success
    return res.status(StatusCodes.OK).json({ questions: allQuestionsData });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// Get Single Question
async function singleQuestion(req, res) {
  // destructure the request body to get questionid
  const questionid = req.params.question_id;

  try {
    // select the question that matches with the questionid destructured
    const [singleQuestionData] = await dbConnection.query(
      "SELECT questionid AS question_id, title,description AS content ,userid AS user_id, questions.create_at FROM questions WHERE questionid=?",
      [questionid]
    );

    // response if there is no question that matches with the questionid destructured
    if (singleQuestionData.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "The requested question could not be found.",
      });
    }

    // send the selected question
    res.status(StatusCodes.OK).json({ question: singleQuestionData });
  } catch (error) {
    // Handle errors, e.g., database issues
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// Post Question
async function postQuestion(req, res) {
  // Destructure user inputs from the request body
  const { title, description } = req.body;
  const questionid = uuidv4();

  // Destructure username and userid from the authMiddleWare (req.user)
  const { username, userid } = req.user;

  // Validate inputs: check if all required fields are provided
  if (!title || !description || !questionid || !username || !userid) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }

  // Check if the title length exceeds the allowed length
  if (title.length > 200) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Title is too much",
    });
  }

  try {
    // Insert the question into the database
    await dbConnection.query(
      "INSERT INTO questions (questionid,userid,title,description) VALUES( ?, ?, ?, ? )",
      [questionid, userid, title, description]
    );

    // Respond if the question is successfully created
    res.status(StatusCodes.CREATED).json({
      message: "Question created successfully",
    });
  } catch (error) {
    // Handle errors, e.g., database issues
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// export functions
module.exports = { postQuestion, allQuestions, singleQuestion };
