exports.viewProfile = (req, res) => {
    res.render('profile', { user: req.user });
  };