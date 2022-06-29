const jwt = require("jsonwebtoken");
const { token } = require("morgan");

// token creation
const generateToken = (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, process.env.JWTSECRETKEY, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};

// Token validation
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWTSECRETKEY, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
