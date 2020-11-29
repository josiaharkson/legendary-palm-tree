const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const tournamentRouter = require("./tournament");

router.use("/user", userRouter);
router.use("/tournament", tournamentRouter);

module.exports = router;
