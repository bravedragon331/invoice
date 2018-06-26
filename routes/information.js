var auth = require('../utils/auth');
var express = require('express');
var router = express.Router();
var information = require('../controller/information');

router.use('/', auth.requireLogin, function(req, res, next) {
  next();
})

router.get('/', auth.requireRole(1), information.index);
router.post('/load_client', information.load_client);
router.get('/solicitud', information.solicitud);
router.post('/solicitud/load_empresa', information.load_empresa);
router.post('/solicitud/save_empresa', information.save_empresa);

router.post('/solicitud/load_representante', information.load_representante);
router.post('/solicitud/save_representante', information.save_representante);

router.post('/solicitud/load_transferencia', information.load_transferencia);
router.post('/solicitud/save_transferencia', information.save_transferencia);

router.post('/solicitud/load_publicidad', information.load_publicidad);
router.post('/solicitud/save_publicidad', information.save_publicidad);

router.post('/accept', information.accept_solicitud);
router.post('/publish', information.publish);
module.exports = router;