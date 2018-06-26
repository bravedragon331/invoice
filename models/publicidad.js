var db = require('./db');

var createPublicidad = function(body, callback) {
  db.query(`INSERT INTO publicidad(empresa, tel, tipo, descanso, servicio, direccion, domicilio, presentacion, confirmacion, minimo, tarjeta, usrid)
            values (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [body.empresa, body.tel, body.tipo, body.descanso, body.servicio, body.direccion, body.domicilio,
     body.presentacion, body.confirmacion, body.minimo, body.tarjeta, body.usrid], 
    function(err) {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate user id, try again
          return createPublicidad(body, callback);
        }
        return callback(err, false);
      }
      // Successfully created user
      return callback(null, true);
    }
  )
}
var getPublicidad = function(id, callback) {
  db.query(`SELECT * FROM publicidad WHERE usrid = ?`, [id], function(err, rows) {
    callback(err, rows);
  })
}
var updatePublicidad = function(body, callback) {
  db.query(`UPDATE publicidad SET ? WHERE usrid = ?`, [
    {
      empresa: body.empresa, tel: body.tel, descanso: body.descanso, servicio: body.servicio, direccion: body.direccion, domicilio: body.domicilio,
      presentacion: body.presentacion, confirmacion: body.confirmacion, minimo: body.minimo, tarjeta: body.tarjeta
    }, body.usrid
  ], function(err) {    
    return callback(err, true);
  })
}
var savePublicidad = function(body, callback) {
  db.query(`
    SELECT * FROM publicidad WHERE usrid = ?
  `, [body.usrid], function(err, rows) {
    if(err) {
      callback(err);
    } else {
      if(rows.length == 1) {
        updatePublicidad(body, callback);
      } else if(rows.length == 0){
        createPublicidad(body, callback);
      } else {
        callback(null, false);
      }
    }
  })
}

exports.getPublicidad = getPublicidad;
exports.savePublicidad = savePublicidad;
