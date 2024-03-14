const { Router } = require("express");
const { register, login } = require("../controllers/user/authController.js");
const { getUser, updateProfile, updateProfileImg } = require("../controllers/user/userController.js");
const { registerValidator, loginValidator, updateProfileValidator } = require("../middlewares/validator/userValidation.js");
const verifyToken = require("../middlewares/verifyToken.js");
const upload = require("../middlewares/multer.js");

const router = Router();

router.post("/registration", registerValidator, register);
router.post("/login", loginValidator, login);

// profil
router.get("/profile", verifyToken, getUser);
router.put("/profile/update", verifyToken, updateProfileValidator, updateProfile);
router.put("/profile/image", verifyToken, upload.single("img"), updateProfileImg);

module.exports = router;
