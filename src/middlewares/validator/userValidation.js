const validator = require("validator");
const { getOneUser } = require("../../models/user");

const registerValidator = async (req, res, next) => {
  const { email, password, first_name, last_name } = req.body;

  // Array Penampung error
  let errorMsg = [];

  for (let key in req.body) {
    if (validator.isEmpty(req.body[key].trim())) {
      errorMsg.push(`${key} tidak boleh kosong!`);
    }
  }

  //   Duplikat
  let duplikat = await getOneUser(email);
  duplikat = duplikat[0];
  if (duplikat != undefined) {
    errorMsg.push("email sudah tersedia");
  }

  //   Cek Apakah Format Email
  if (!validator.isEmail(email)) {
    errorMsg.push("parameter email tidak sesuai format");
  }

  //   Cek Apakah Format Password
  if (!/^.{8,}$/.test(password)) {
    errorMsg.push("Password harus lebih dari 8 karakter! ");
  }

  //   Cek Harus format huruf
  if (!validator.isAlpha(first_name)) {
    errorMsg.push("parameter 'first_name' tidak sesuai format");
  }

  if (!validator.isAlpha(last_name)) {
    errorMsg.push("parameter 'last_name' tidak sesuai format");
  }

  if (errorMsg.length > 0) {
    return next(errorMsg);
  }

  next();
};

// Login Validation
const loginValidator = (req, res, next) => {
  const { email, password } = req.body;

  let errorMsg = [];

  for (let key in req.body) {
    if (validator.isEmpty(req.body[key].trim())) {
      errorMsg.push(`${key} tidak boleh kosong!`);
    }
  }

  if (!validator.isEmail(email)) {
    errorMsg.push("parameter email tidak sesuai format");
  }

  if (!/^.{8,}$/.test(password)) {
    errorMsg.push("Password harus lebih dari 8 karakter! ");
  }

  if (errorMsg.length > 0) {
    return next(errorMsg);
  }

  next();
};

// Update Profile Validation
const updateProfileValidator = (req, res, next) => {
  const { userFirst_name, userLast_name } = req.body;

  // Array Penampung error
  let errorMsg = [];

  for (let key in req.body) {
    if (validator.isEmpty(req.body[key].trim())) {
      errorMsg.push(`${key} tidak boleh kosong!`);
    }
  }

  //   Cek Harus format huruf
  if (!validator.isAlpha(userFirst_name)) {
    errorMsg.push("parameter 'first_name' tidak sesuai format");
  }

  if (!validator.isAlpha(userLast_name)) {
    errorMsg.push("parameter 'last_name' tidak sesuai format");
  }

  if (errorMsg.length > 0) {
    return next(errorMsg);
  }

  next();
};

module.exports = { registerValidator, loginValidator, updateProfileValidator };
