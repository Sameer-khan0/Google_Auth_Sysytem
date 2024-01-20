const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const usercontroller = require("../controller/usercontroller");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Token = require("../models/token");

// user registration
router.post("/register",[body("email").isEmail().normalizeEmail(),
body("password").isLength({ min: 6 }),],usercontroller.register);

// user varification
router.get("/:id/verify/:token/", usercontroller.varifying);

// user login
router.post("/login",[body("email").isEmail().normalizeEmail(),
body("password").isLength({ min: 6 }),], usercontroller.login);

module.exports = router;
