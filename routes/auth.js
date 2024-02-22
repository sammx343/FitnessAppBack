const express = require("express");
const UserModel = require("../models/users");
const router = express.Router();
const authController = require("../controllers/auth");
// ../auth/

router.post("/signup", authController.postSignUp);
router.post("/signin", authController.postSignIn);
module.exports = router;
