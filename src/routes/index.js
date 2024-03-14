const { Router } = require("express");
const userRouter = require("./user.js");
const informationRouter = require("./information.js");
const transactionRouter = require("./transaction.js");

const router = Router();

router.use("/", userRouter);
router.use("/", informationRouter);
router.use("/", transactionRouter);

module.exports = router;
