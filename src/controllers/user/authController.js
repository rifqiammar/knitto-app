const { getAllUsers, getOneUser, createUser, updateUser, deleteUser } = require("../../models/user.js");
const { createUserAccount } = require("../../models/transaction.js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    // Send to Database
    result = await createUser(email, password, first_name, last_name);
    const { user_id } = result[0];
    await createUserAccount(user_id, 0);

    res.status(200).json({
      status: 0,
      message: "Registrasi berhasil silahkan login",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 102,
      message: "Paramter email tidak sesuai format",
      data: null,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cek jika email tersedia
    const user = await getOneUser(email);
    if (user.length == 0) throw new Error("username atau password salah");
    if (password !== user[0].password) throw new Error("username atau password salah");

    // Generate Json Web Token
    const userEmail = user[0].email;

    const token = jwt.sign({ userEmail }, process.env.SECRET_KEY, {
      expiresIn: "12h",
    });

    res.status(200).json({
      status: 0,
      message: "Login berhasil",
      data: { token },
    });
  } catch (error) {
    res.status(400).json({
      status: 103,
      message: error.message,
      data: null,
    });
  }
};
module.exports = { register, login };
