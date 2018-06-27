var db = require('./db');
var addDocument = function(id, name, title, callback) {
  db.query(`INSERT INTO dato(usrid, name, title) values (?,?,?)`,
    [id, name, title], function(err) {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate user id, try again
          return addDocument(id, name, callback);
        }
        return callback(err, false);
      }
      // Successfully created user
      return callback(null, true);
    })
}
var addImage = function(body, name, title, callback) {
  db.query(`INSERT INTO dato(usrid, nombre, categoria, descripcion, precio, name, title) values (?,?,?,?,?,?,?)`,
    [body.id, body.nombre, body.categoria, body.descripcion, body.precio, name, title], function(err) {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate user id, try again
          return addImage(id, name, callback);
        }
        return callback(err, false);
      }
      // Successfully created user
      return callback(null, true);
    })
}
var loadDato = function(id, callback) {
  db.query(`SELECT * FROM dato WHERE usrid = ?`, [id], function(err, rows) {
    callback(err, rows);
  })
}
var updateDato = function(body, callback) {
  db.query(`UPDATE dato SET ? WHERE id = ?`, [
    {
      nombre: body.nombre, categoria: body.categoria, precio: body.precio, descripcion: body.descripcion
    }, body.id
  ], function(err) {    
    return callback(err, true);
  })
}
var removeDato = function(body, callback) {
  db.query('DELETE FROM dato WHERE id = ?', [body.id], function(err) {
    if(err) {
      return callback(err);
    } else {
      return callback(null);
    }
  })
}

exports.addDocument = addDocument;
exports.addImage = addImage;
exports.loadDato = loadDato;
exports.updateDato = updateDato;
exports.removeDato = removeDato;