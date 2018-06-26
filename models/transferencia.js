var db = require('./db');

var createTransferencia = function(body, callback) {
  db.query(`INSERT INTO transferencia(banco, cuenta_numero, cuenta_nombre, pago, usrid) values (?,?,?,?,?)`,
    [body.banco, body.cuenta_numero, body.cuenta_nombre, body.pago, body.usrid], 
    function(err) {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate user id, try again
          return createTransferencia(body, callback);
        }
        return callback(err, false);
      }
      // Successfully created user
      return callback(null, true);
    }
  )
}
var getTransferencia = function(id, callback) {
  db.query(`SELECT * FROM transferencia WHERE usrid = ?`, [id], function(err, rows) {
    callback(err, rows);
  })
}
var updateTransferencia = function(body, callback) {
  db.query(`UPDATE transferencia SET ? WHERE usrid = ?`, [
    {
      banco: body.banco, cuenta_numero: body.cuenta_numero, cuenta_nombre: body.cuenta_nombre, pago: body.pago,
    }, body.usrid
  ], function(err) {    
    return callback(err, true);
  })
}
var saveTransferencia = function(body, callback) {
  db.query(`
    SELECT * FROM transferencia WHERE usrid = ?
  `, [body.usrid], function(err, rows) {
    if(err) {
      callback(err);
    } else {
      if(rows.length == 1) {
        updateTransferencia(body, callback);
      } else if(rows.length == 0){
        createTransferencia(body, callback);
      } else {
        callback(null, false);
      }
    }
  })
}

exports.getTransferencia = getTransferencia;
exports.saveTransferencia = saveTransferencia;
