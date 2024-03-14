const { Router } = require("express");
const { getBalance, setTopup, setTransactionPaymentBalance, transactionHistory } = require("../controllers/transaction/transaction.js");
const verifyToken = require("../middlewares/verifyToken.js");
const { topupValidation } = require("../middlewares/validator/transactionValidator.js");

const router = Router();

router.get("/balance", verifyToken, getBalance);
router.post("/topup", verifyToken, topupValidation, setTopup);
router.post("/transaction", verifyToken, setTransactionPaymentBalance);

router.get("/transaction/history", verifyToken, transactionHistory);

module.exports = router;
