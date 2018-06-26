var auth = require('../utils/auth');
var express = require('express');
var router = express.Router();
var organization = require('../controller/organization');

router.use('/', auth.requireLogin, function(req, res, next) {
  next();
})

router.get('/', auth.requireRole(6), organization.users);
router.post('/checkemail', organization.checkemail);
router.post('/user_add', organization.user_add);
router.post('/user_auth', auth.requireRole(6), organization.user_auth);
router.post('/user_update', organization.user_update);
router.post('/add_auth', organization.add_auth);
router.post('/update_auth', organization.update_auth);
router.post('/remove_auth', organization.remove_auth);


module.exports = router;