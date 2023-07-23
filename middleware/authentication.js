
// exports.ensureAuthenticated = (req, res, next) => {
   
//   if (req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect('/login');
//   };

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config/jwtconfig");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(401).json({
    status: "fail",
    message: "unauthorized"
  });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    console.log(err)
    if (err)  return res.status(403).json({
      status: "Invalid token",
      message: err
    });

    req.user = user
    next();
  })
};