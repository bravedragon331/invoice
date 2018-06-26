exports.login = function(req, res){   
  res.render('auth/sign-in', { message: req.flash('loginMessage')});
}

exports.signup = function(req, res){
  res.render('auth/sign-up');
}

exports.forget = function(req, res){
  res.render('auth/forget');
}