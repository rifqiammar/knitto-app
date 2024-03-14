const e = require("express");
const validator = require("validator");

const topupValidation = (req, res, next) => {
  const { top_up_amount } = req.body;

  const amount = parseInt(top_up_amount);

  // Array Penampung error
  let errorMsg = [];

  for (let key in req.body) {
    if (validator.isEmpty(req.body[key].trim())) {
      errorMsg.push(`${key} tidak boleh kosong!`);
    }
  }

  //   Cek Harus format huruf
  if (!validator.isNumeric(top_up_amount) || amount < 0) {
    errorMsg.push("Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0");
  }

  if (errorMsg.length > 0) {
    return next(errorMsg);
  }

  next();
};

module.exports = { topupValidation };
