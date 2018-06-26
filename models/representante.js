var db = require('./db');

var createRepresentante = function(body, callback) {
  db.query(`INSERT INTO representante(nombre, dpi, tel, usrid) values (?,?,?,?)`,
    [body.nombre, body.dpi, body.tel, body.usrid], 
    function(err) {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate user id, try again
          return createRepresentante(body, callback);
        }
        return callback(err, false);
      }
      // Successfully created user
      return callback(null, true);
    }
  )
}
var getRepresentante = function(id, callback) {
  db.query(`SELECT * FROM representante WHERE usrid = ?`, [id], function(err, rows) {
    callback(err, rows);
  })
}
var updateRepresentante = function(body, callback) {
  db.query(`UPDATE representante SET ? WHERE usrid = ?`, [
    {
      nombre: body.nombre, dpi: body.dpi, tel: body.tel
    }, body.usrid
  ], function(err) {    
    return callback(err, true);
  })
}
var saveRepresentante = function(body, callback) {
  db.query(`
    SELECT * FROM representante WHERE usrid = ?
  `, [body.usrid], function(err, rows) {
    if(err) {
      callback(err);
    } else {
      if(rows.length == 1) {
        updateRepresentante(body, callback);
      } else if(rows.length == 0){
        createRepresentante(body, callback);
      } else {
        callback(null, false);
      }
    }
  })
}

exports.getRepresentante = getRepresentante;
exports.saveRepresentante = saveRepresentante;
