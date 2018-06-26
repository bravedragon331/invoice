var db = require('./db');
var loadA = function(callback) {
  db.query(`
    SELECT users.*, empresa.empresa, empresa.nit, empresa.nombre, publish.id as p_id
    FROM users
    LEFT JOIN empresa ON users.id = empresa.usrid
    LEFT JOIN publish ON users.id = publish.usrid
  `, [], function(err, rows) {
    callback(err, rows);
  })
}
exports.loadA = loadA;