const { getAllUsers, getOneUser, createUser, updateUser, updateImg, deleteUser } = require("../../models/user.js");

const getUser = async (req, res) => {
  try {
    const decEmail = req.email;
    // Send to Database
    const result = await getOneUser(decEmail);
    const { email, first_name, last_name, profile_image } = result[0];

    res.status(200).json({
      status: 0,
      message: "Sukses",
      data: { email, first_name, last_name, profile_image },
    });
  } catch (error) {
    res.status(400).json({
      status: 102,
      message: error.message,
      data: null,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userFirst_name, userLast_name } = req.body;
    const decEmail = req.email;

    const result = await updateUser(decEmail, { userFirst_name, userLast_name });
    const { email, first_name, last_name, profile_image } = result[0];

    res.status(200).json({
      status: 0,
      message: "Update Pofile berhasil",
      data: { email, first_name, last_name, profile_image },
    });
  } catch (error) {
    res.status(400).json({
      status: 102,
      message: error.message,
      data: null,
    });
  }
};

const updateProfileImg = async (req, res) => {
  try {
    if (req.errorValidateFile) {
      throw new Error(req.errorValidateFile);
    }

    if (!req.file) throw new Error("File tidak ditemukan");

    const decEmail = req.email;

    // image name
    const file = req.file;
    const fileName = file.filename;

    const pImg = `${req.protocol}://${req.hostname}:${process.env.PORT}/purchasing/stockphoto/${fileName}`;

    const result = await updateImg(pImg, decEmail);

    const { email, first_name, last_name, profile_image } = result[0];

    res.status(200).json({
      status: 0,
      message: "Update Profile Image berhasil",
      data: { email, first_name, last_name, profile_image },
    });
  } catch (error) {
    res.status(400).json({
      status: 102,
      message: error.message,
      data: null,
    });
  }
};

module.exports = { getUser, updateProfile, updateProfileImg };
