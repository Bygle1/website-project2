// Route setting file
const express = require("express");
const usersValidation = require("../../validation/users");
const bcrypt = require("../../config/bcrypt");
const usersModel = require("../../model/users");
const jwt = require("../../config/jwt");
const router = express.Router();

// Connection link http://localhost:3000/api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const validatedValue = await usersValidation.singupSchema.validateAsync(
      req.body
    );
    const userData = await usersModel.selectUserByEmail(validatedValue.email);
    console.log("auth/singup/userData", userData);
    if (userData.length === 0) {
      // checking for existing users
      const hashPassword = await bcrypt.createHash(validatedValue.password);
      await usersModel.insertUser(
        validatedValue.email,
        hashPassword,
        validatedValue.name
      );
      res.json("user inserted");
    } else {
      throw "User exists";
    }
  } catch (err) {
    console.log("err from signup", err);
    res.status(401).json({ err });
  }
});

// Connection link http://localhost:3000/api/auth/login
router.post("/login", async (req, res) => {
  try {
    const validatedValue = await usersValidation.loginSchema.validateAsync(
      req.body
    );
    let userData = await usersModel.selectUserByEmail(validatedValue.email);
    if (userData.length > 0) {
      userData = userData[0];
      const hashResult = await bcrypt.cmpHash(
        validatedValue.password,
        userData.password
      );
      if (hashResult) {
        const jwtData = await jwt.generateToken({
          id: userData._id,
          email: userData.email,
        });
        res.json({ token: jwtData });
      } else {
        throw "Wrong password";
      }
    } else {
      throw "User not found";
    }
  } catch (err) {
    console.log("err from login", err);
    res.status(401).json({ err });
  }
});

module.exports = router;
