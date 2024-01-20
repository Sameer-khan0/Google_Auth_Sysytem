const express = require("express");
const { validationResult } = require("express-validator");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Token = require("../models/token");

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        if(user && !user.verified){
        await User.findByIdAndDelete(user._id)
        await Token.findOneAndDelete({userId:user._id})
           return  res.status(409)
            .send({message: "User is not registered try again" });
        }
        return res
          .status(409)
          .send({ message: "User with given email already exists!" });
    }

    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);

    user = await new User({
      username: username,
      email: email,
      password: hashPassword,
    }).save();

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    // const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;
    const url = `http://localhost:4022/api/user/${user.id}/verify/${token.token}`;
    //   await sendEmail(user.email, "Verify Email", url);

    res
      .status(201)
      .send({ status:"ok",message: "An Email sent to your account, please verify" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.varifying = async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    await User.updateOne({ _id: user._id, verified: true });
    await token.remove();

    res.status(200).send({ message: "Email verified successfully" });
} catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
}
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      try {
        const user = await User.findOne({ email: email });
        if (user) {
          const comparePassword = await bcrypt.compare(password, user.password);
          if (comparePassword) {
            const isVerified = user.verified;
            if (isVerified) {
              res.status(200).send({ status: "ok", message: "Logged in successfully" });
            } else {
              res.status(400).send({ message: "Not verified" });
            }
          } else {
            res.status(400).send({ message: "Wrong Password" });
          }
        } else {
          res.status(400).send({ message: "User not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
  