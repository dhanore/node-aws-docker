const passport = require("passport");

exports.renderLogin = (req, res) => {
  res.render("login");
};

exports.login = (req, res, next) => {
  console.log("login");
  passport.authenticate("azuread-openidconnect", {
    response: res,
    prompt: "login",
    failureRedirect: "/",
  })(req, res, next);
};

exports.logout = (req, res) => {
  console.log("logout");
  req.logout();
  res.redirect("/");
};

exports.callback = (req, res, next) => {
  console.log("callback");

//   passport.authenticate("azuread-openidconnect", {
//     response: res,
//     failureRedirect: "/",
//   })(req, res, next);
};

exports.profile = (req, res) => {
  console.log("profile");
  res.render("profile", { user: req.user });
};
