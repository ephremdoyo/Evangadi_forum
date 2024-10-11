const express = require("express");
const authMiddleWare = require("../middleWare/authMiddleWare");
const router = express.Router();
const { postAnswer, answer } = require("../controller/answerController");

// post answer
router.post("/:question_id", authMiddleWare, postAnswer);

// get answer
router.get("/:question_id", authMiddleWare, answer);

module.exports = router;
