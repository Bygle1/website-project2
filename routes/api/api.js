// Route setting file
const express = require("express");
const authRouter = require("./auth");

const router = express.Router();

// route for authontication
router.use("/auth", authRouter);

module.exports = router;
