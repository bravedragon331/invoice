var db = require('./db');
var addDato = function(id, name, title, callback) {
  db.query(`INSERT INTO dato(usrid, name, title) values (?,?,?)`,
    [id, name, title], function(err) {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate user id, try again
          return addDato(id, name, callback);
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

exports.addDato = addDato;
exports.loadDato = loadDato;