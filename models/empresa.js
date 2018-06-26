var db = require('./db');

var createEmpresa = function(body, callback) {
  db.query(`INSERT INTO empresa(empresa, nit, tipo, numero, folio, libro, nombre, ddmmaa, direccion, documento, usrid) values (?,?,?,?,?,?,?,?,?,?,?)`,
    [body.empresa, body.nit, body.tipo, body.numero, body.folio, body.libro, body.nombre, body.ddmmaa, body.direccion, body.documento, body.usrid], 
    function(err) {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate user id, try again
          return createEmpresa(body, callback);
        }
        return callback(err, false);
      }
      // Successfully created user
      return callback(null, true);
    }
  )
}
var getEmpresa = function(id, callback) {
  db.query(`SELECT * FROM empresa WHERE usrid = ?`, [id], function(err, rows) {
    callback(err, rows);
  })
}
var updateEmpresa = function(body, callback) {
  db.query(`UPDATE empresa SET ? WHERE usrid = ?`, [
    {
      empresa: body.empresa, nit: body.nit, tipo: body.tipo, numero: body.numero, folio: body.folio, libro: body.libro,
      nombre: body.nombre, ddmmaa: body.ddmmaa, direccion: body.direccion, documento: body.documento,
    }, body.usrid
  ], function(err) {    
    return callback(err, true);
  })
}
var saveEmpresa = function(body, callback) {
  db.query(`
    SELECT * FROM empresa WHERE usrid = ?
  `, [body.usrid], function(err, rows) {
    if(err) {
      callback(err);
    } else {
      if(rows.length == 1) {
        updateEmpresa(body, callback);
      } else if(rows.length == 0){
        createEmpresa(body, callback);
      } else {
        callback(null, false);
      }
    }
  })
}

exports.getEmpresa = getEmpresa;
exports.saveEmpresa = saveEmpresa;
