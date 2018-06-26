var User = require('../models/user');
var Invoice = require('../models/invoice');
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
      res.render('information/invoice', {usr: data, admin: req.user});
    }
  })
}
exports.invoice_add = function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var filename;
    if(files.file != undefined){
      filename = uniqid();
      var old_path = files.file.path;
      var file_size = files.file.size;
      var file_ext = files.file.name.split('.').pop();
      var new_path = path.join(appRoot, '/public/uploads/invoice/', filename + '.' + file_ext);
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
      Invoice.addInvoice(fields, filename + '.' + file_ext, function(err, result){
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
exports.invoice_update = function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var filename;
    if(files.file != undefined){
      filename = uniqid();
      var old_path = files.file.path;
      var file_size = files.file.size;
      var file_ext = files.file.name.split('.').pop();
      var new_path = path.join(appRoot, '/public/uploads/invoice/', filename + '.' + file_ext);
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
      Invoice.updateInvoice(fields, filename + '.' + file_ext, function(err){
        if(err){
          res.json({isSuccess:false});
        }else{
          res.json({isSuccess:true});
        }
      })
    } else {
      Invoice.updateInvoice(fields, null, function(err){
        if(err){
          res.json({isSuccess:false});
        }else{
          res.json({isSuccess:true});
        }
      })
    }
  });
}
exports.invoice_load = function(req, res) {
  Invoice.loadInvoice(req.body.usrid, function(err, rows) {
    if(err) {
      res.json({status: false});
    } else {
      res.json({status: true, list: rows});
    }
  })
}
exports.invoice_remove = function(req, res) {
  Invoice.removeInvoice(req.body, function(err) {
    if(err) {
      res.json({isSuccess: false});
    } else {
      res.json({isSuccess: true});
    }
  })
}