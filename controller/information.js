var Information = require('../models/information');
var Empresa = require('../models/empresa');
var Representante = require('../models/representante');
var Transferencia = require('../models/transferencia');
var Publicidad = require('../models/publicidad');
var User = require('../models/user');
var Publish = require('../models/publish');

exports.index = function(req, res) {
  res.render('information/index', {role: res.role});
}
exports.load_client = function(req, res) {
  Information.loadA(function(err, rows) {
    if(err) {
      res.json({isSuccess: false});
    } else {
      if(req.user.type == 0) {
        rows = rows.filter(v => {
          return v.id == req.user.id;
        })        
      }
      rows = rows.filter(v => {
        return v.type == 0;
      })
      res.json({isSuccess: true, list: rows});
    }
  })
}
exports.solicitud = function(req, res) {  
  User.getUserByID(req.query.id, function(err, data) {
    if(err) {
      res.redirect('/');
    } else {
      console.log(data);
      res.render('information/solicitud', {usr: data, admin: req.user});
    }
  })  
}
exports.load_empresa = function(req, res) {
  Empresa.getEmpresa(req.body.id, function(err, rows) {
    if(err) {
      res.json({isSuccess: false});
    } else {
      res.json({isSuccess: true, data: rows[0]});
    }
  })
}
exports.save_empresa = function(req, res) {
  Empresa.saveEmpresa(req.body, function(err, result) {
    console.log(err);
    if(err) {
      res.json({isSuccess: false});
    } else {
      res.json({isSuccess: result});
    }
  })
}
exports.load_representante = function(req, res) {
  Representante.getRepresentante(req.body.id, function(err, rows) {
    if(err) {
      res.json({isSuccess: false});
    } else {
      res.json({isSuccess: true, data: rows[0]});
    }
  })
}
exports.save_representante = function(req, res) {
  Representante.saveRepresentante(req.body, function(err, result) {
    console.log(err);
    if(err) {
      res.json({isSuccess: false});
    } else {
      res.json({isSuccess: result});
    }
  })
}
exports.load_transferencia = function(req, res) {
  Transferencia.getTransferencia(req.body.id, function(err, rows) {
    if(err) {
      res.json({isSuccess: false});
    } else {
      res.json({isSuccess: true, data: rows[0]});
    }
  })
}
exports.save_transferencia = function(req, res) {
  Transferencia.saveTransferencia(req.body, function(err, result) {
    if(err) {
      res.json({isSuccess: false});
    } else {
      res.json({isSuccess: result});
    }
  })
}
exports.load_publicidad = function(req, res) {
  Publicidad.getPublicidad(req.body.id, function(err, rows) {
    if(err) {
      res.json({isSuccess: false});
    } else {
      res.json({isSuccess: true, data: rows[0]});
    }
  })
}
exports.save_publicidad = function(req, res) {
  console.log(req.body);
  Publicidad.savePublicidad(req.body, function(err, result) {
    console.log(err);
    if(err) {
      res.json({isSuccess: false});
    } else {
      res.json({isSuccess: result});
    }
  })
}
exports.accept_solicitud = function(req, res) {
  User.getAccept(req.body.usrid, function(err) {
    if(err) {
      res.json({isSuccess: false});
    } else {
      res.json({isSuccess: true});
    }
  })
}
exports.publish = function(req, res) {
  Publish.addPublish(req.body.usrid, function(err, result) {
    if(err) {
      res.json({isSuccess: false});
    } else {
      res.json({isSuccess: true});
    }
  })
}