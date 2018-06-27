var User = require('../models/user');
var Dato = require('../models/dato');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var uniqid = require('uniqid');

exports.index = function(req, res) {
  User.getUserByID(req.query.id, function(err, data) {
    if(err) {
      res.redirect('/');
    } else {
      console.log(data);
      res.render('information/dato', {usr: data, admin: req.user});
    }
  })
}
exports.upload = function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var filename;
    if(files.file != undefined){
      filename = uniqid();
      var old_path = files.file.path;
      var file_size = files.file.size;
      var file_ext = files.file.name.split('.').pop();
      if((file_ext.toLowerCase() == 'jpg') || (file_ext.toLowerCase() == 'png') || (file_ext.toLowerCase() == 'jpeg')) {
        var new_path = path.join(appRoot, '/public/uploads/dato/image/', filename + '.' + file_ext);
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
        Dato.addImage(fields, filename + '.' + file_ext, files.file.name, function(err, result) {
          console.log(err);
          if(err){
            res.json({isSuccess:false});
          }else{
            res.json({isSuccess:true});
          }
        })
      } else if(file_ext == 'pdf') {
        var new_path = path.join(appRoot, '/public/uploads/dato/pdf/', filename + '.' + file_ext);
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
        Dato.addDocument(fields.id, filename + '.' + file_ext, files.file.name, function(err, result) {
          if(err){
            res.json({isSuccess:false});
          }else{
            res.json({isSuccess:true});
          }
        })
      }      
      
    }    
  });
}
exports.load = function(req, res) {
  Dato.loadDato(req.body.id, function(err, result) {
    if(err) {
      res.json({isSuccess: false});
    } else {
      res.json({isSuccess: true, list: result});
    }
  })
}
exports.update = function(req, res) {
  Dato.updateDato(req.body, function(err, result) {
    if(err) {
      res.json({isSuccess: false});
    } else {
      res.json({isSuccess: true});
    }
  })
}
exports.remove = function(req, res) {
  Dato.removeDato(req.body, function(err) {
    if(err) {
      res.json({isSuccess: false});
    } else {
      res.json({isSuccess: true});
    }
  })
}