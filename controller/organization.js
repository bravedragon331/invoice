var User = require('../models/user');
var Auth = require('../models/auth');
var Const = require('../config/const');

exports.checkemail = function(req, res){
  User.getUser(req.body.email, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result.length==0})
    }
  })
}
exports.users = function(req, res){
  User.getUsers(function(err, result){    
    if(err){
      res.redirect('/');
    }else{
      res.render('organization/users', {users: result, role: res.role});
    }
  })
}
exports.user_add = function(req, res){
  User.addUser(req.body, function(err, result){    
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}
exports.user_update = function(req, res){
  User.updateUserInfo(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, usr: result});
    }
  })
}
exports.user_auth = function(req, res){
  var user;
  User.getUser(req.body.email,function(err, result){
    if(err){
      res.redirect('/');
    }else{
      let id = result.id;
      user = result;
      Auth.getAuths(id, function(err, result){
        if(err){
          res.redirect('/');
        }else{
          console.log(result);
          res.render('organization/user_auth', {id: id, pages: Const.pages, auths: result, user: user, role: res.role});
        }
      })
    }    
  })  
}
exports.add_auth = function(req, res){
  Auth.addAuth(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}
exports.update_auth = function(req, res){
  Auth.updateAuth(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}
exports.remove_auth = function(req, res){
  Auth.removeAuth(req.body.index, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}
exports.update_user = function(req, res) {
  User.updateUserInfo(req.body, function(err, user) {
    if(err) {
      res.json({isSuccess: false});
    } else {
      res.json({isSuccess: true, usr: user})
    }
  })
}