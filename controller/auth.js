exports.login = function(req, res){   
  res.render('auth/sign-in');
}

exports.signup = function(req, res){
  res.render('auth/sign-up');
}

exports.forget = function(req, res){
  res.render('auth/forget');
}