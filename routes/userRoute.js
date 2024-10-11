const express = require("express");
const router = express.Router();
const { register, login, checkUser } = require("../controller/userController");
const authMiddleWare = require("../middleWare/authMiddleWare");

// register route
router.post("/register", register);

// login user
router.post("/login", login);
// check user
router.get("/checkUser", authMiddleWare, checkUser);

module.exports = router;
