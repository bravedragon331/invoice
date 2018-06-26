var auth = require('../utils/auth');
var express = require('express');
var router = express.Router();
var termcondition = require('../controller/termcondition');

router.use('/', auth.requireLogin, function(req, res, next) {
  next();
})

router.get('/', auth.requireRole(5), termcondition.index);
router.post('/term_add', termcondition.term_add);
router.post('/term_update', termcondition.term_update);
router.post('/term_load', termcondition.term_load);
router.post('/term_remove', termcondition.term_remove);
router.get('/download/detail', function(req, res) {
  res.redirect('/uploads/term/' + req.query.name);
})
module.exports = router;