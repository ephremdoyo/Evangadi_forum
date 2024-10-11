const express = require("express");
const router = express.Router();
const {
  allQuestions,
  postQuestion,
  singleQuestion,
} = require("../controller/questionController");
const authMiddleWare = require("../middleWare/authMiddleWare");

// routes to post questions
router.post("/", authMiddleWare, postQuestion);

// routes to get all questions

router.get("/", authMiddleWare, allQuestions);

// routes to single question
router.get("/:question_id", authMiddleWare, singleQuestion);

// export routes
module.exports = router;
