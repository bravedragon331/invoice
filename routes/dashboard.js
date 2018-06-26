var auth = require('../utils/auth');
var express = require('express');
var router = express.Router();

router.use('/', auth.requireLogin, function(req, res, next) {
  next();
})

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;