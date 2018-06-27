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

exports.addDocument = addDocument;
exports.addImage = addImage;
exports.loadDato = loadDato;