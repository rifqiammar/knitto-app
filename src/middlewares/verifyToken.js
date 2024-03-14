const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({
      status: 108,
      message: "Token tidak tidak valid atau kadaluwarsa",
      data: null,
    });
  jwt.verify(authorization.split(" ")[1], process.env.SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(401).json({
        status: 108,
        message: "Token tidak tidak valid atau kadaluwarsa",
        data: null,
      });
    req.email = decoded.userEmail;
    next();
  });
};

module.exports = verifyToken;
