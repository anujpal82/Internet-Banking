const jwt = require("jsonwebtoken");
const ensureToken = (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET, (err, data) => {
    if (err) {
      console.log(err.message);
    }

    next();
  });
};

module.exports = ensureToken;
