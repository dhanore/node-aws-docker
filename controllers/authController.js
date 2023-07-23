const User = require("../models/userModels");
const { JWT_SECRET } = require("../config/jwtconfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// exports.renderLogin = (req, res) => {
//   res.render("login");
// };

exports.signup = async (req, res) => {
  const { email,displayName, password } = req.body;
  const hashpassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      email,
      displayName,
      password: hashpassword
    });
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    // res.status(400).json({
    //   status: "fail",
    //   error: err,
    // });
    res.status(500).send(err);
    console.log(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!email) {
      return res.status(404).json({
        status: "fali",
        message: "user not found",
      });
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (isCorrect) {
      const token = jwt.sign({ email: user.email, role: "admin" }, JWT_SECRET, {
        expiresIn: "60s",
        audience: "http://localhost:3000/",
        issuer: "http://localhost:3000",
      });

      res.status(200).json({
        status: "success",
        token: token
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "incorrect email or password",
      });
    }
  } catch {}
};

// exports.login = async (req, res, next) => {
//   console.log("login");
//  try{
//   let m = await User.findOne({email:req.email,password:req.password});
//   if(m!=null)
//   {

//   }
//  }
//  catch{

//  }
// };

// exports.logout = (req, res) => {
//   console.log("logout");
//   req.logout();
//   res.redirect("/");
// };

// exports.callback = (req, res, next) => {
//   console.log("callback");

// //   passport.authenticate("azuread-openidconnect", {
// //     response: res,
// //     failureRedirect: "/",
// //   })(req, res, next);
// };

// exports.profile = (req, res) => {
//   console.log("profile");
//   res.render("profile", { user: req.user });
// };
