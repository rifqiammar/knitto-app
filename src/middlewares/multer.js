const multer = require("multer");

const diskStorage = multer.diskStorage;

// Multer File Filter
const allowedFileExtension = ["png", "PNG", "JPEG", "jpeg"];
const fileFilterOption = (req, file, cb) => {
  const ext = file.originalname.split(".").pop();

  if (!allowedFileExtension.includes(ext)) {
    req.errorValidateFile = "Format Image tidak sesuai";
    return cb(null, false);
  }

  cb(null, true);
};

// Menentukan dimana menyimpan File yang akan di upload
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.split(" ").join("_");
    cb(null, `${fileName}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1000 * 1000, // 2MB
  },
  fileFilter: fileFilterOption,
});

module.exports = upload;
