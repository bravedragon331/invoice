var User = require('../models/user');
var Auth = require('../models/auth');
var Terms = require('../models/terms');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var uniqid = require('uniqid');

exports.index = function(req, res) {
  res.render('termcondition/index', {role: res.role, admin: req.user});
}
exports.term_add = function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var filename;
    if(files.file != undefined){
      filename = uniqid();
      var old_path = files.file.path;
      var file_size = files.file.size;
      var file_ext = files.file.name.split('.').pop();
      var new_path = path.join(appRoot, '/public/uploads/term/', filename + '.' + file_ext);
      fs.readFile(old_path, function(err, data) {
        fs.writeFile(new_path, data, function(err) {
          fs.unlink(old_path, function(err) {
            if (err) {
              console.log('uploading failure!');
            } else {
              console.log('uploading success!');
            }
          });
        });
      });    
      Terms.addTerm(fields, filename + '.' + file_ext, function(err, result){
        console.log(err);
        if(err){
          res.json({isSuccess:false});
        }else{
          res.json({isSuccess:result});
        }
      })
    }
  });
}
exports.term_update = function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var filename;
    if(files.file != undefined){
      filename = uniqid();
      var old_path = files.file.path;
      var file_size = files.file.size;
      var file_ext = files.file.name.split('.').pop();
      var new_path = path.join(appRoot, '/public/uploads/term/', filename + '.' + file_ext);
      fs.readFile(old_path, function(err, data) {
        fs.writeFile(new_path, data, function(err) {
          fs.unlink(old_path, function(err) {
            if (err) {
              console.log('uploading failure!');
            } else {
              console.log('uploading success!');
            }
          });
        });
      });    
      Terms.updateTerm(fields, filename + '.' + file_ext, function(err){
        if(err){
          res.json({isSuccess:false});
        }else{
          res.json({isSuccess:true});
        }
      })
    }
  });
}
exports.term_load = function(req, res) {
  console.log(req.user);
  Terms.loadTerms(req.user.type == 1?-1:req.user.site, function(err, rows) {
    if(err) {
      res.json({status: false});
    } else {
      res.json({status: true, list: rows});
    }
  })
}
exports.term_remove = function(req, res) {
  Terms.removeTerm(req.body, function(err) {
    if(err) {
      res.json({isSuccess: false});
    } else {
      res.json({isSuccess: true});
    }
  })
}