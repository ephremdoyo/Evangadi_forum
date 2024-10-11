const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Post Answers for a Question
async function postAnswer(req, res) {
  const { answer } = req.body;
  const questionid = req.params.question_id;
  const { userid } = req.user;

  if (!answer) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide answer",
    });
  }

  try {
    // Check if the question exists before inserting the answer
    const [question] = await dbConnection.query(
      "SELECT questionid FROM questions WHERE questionid = ?",
      [questionid]
    );

    if (question.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message:
          "Question not found. Cannot post an answer to a non-existent question.",
      });
    }

    // Insert answer into db
    await dbConnection.query(
      "INSERT INTO answers(userid,questionid, answer) VALUES(?, ?, ?)",
      [userid, questionid, answer]
    );

    return res.status(StatusCodes.CREATED).json({
      message: "Answer posted successfully",
    });
  } catch (error) {
    // handle error
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// Get Answers for a Question
async function answer(req, res) {
  try {
    const questionid = req.params.question_id;
    // insert answer to db
    const [answer] = await dbConnection.query(
      `SELECT answers.answerid AS answer_id, answers.answer AS content, users.username AS user_name, answers.create_at
   FROM answers 
   JOIN users ON answers.userid = users.userid 
   JOIN questions ON answers.questionid = questions.questionid 
   WHERE questions.questionid = ? 
   ORDER BY answers.answerid DESC`,
      [questionid]
    );

    // check if the db has a question
    if (answer.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "No answer found.",
      });
    }

    return res.status(StatusCodes.OK).json(answer);
  } catch (error) {
    // Error handle
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// export functions
module.exports = { postAnswer, answer };
