var db = require('./db');

var createPublish = function(id, callback) {
  db.query(`INSERT INTO publish(usrid) values (?)`,
    [id], function(err) {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate user id, try again
          return createPublish(id, callback);
        }
        return callback(err, false);
      }
      // Successfully created user
      return callback(null, true);
    })
}

var addPublish = function(id, callback) {
  db.query(`SELECT * FROM publish WHERE usrid = ?`, [id], function(err, rows) {
    if(err) {
      callback(err)
    }
    if(rows.length != 0) {
      callback(null, false);
    } else {
      createPublish(id, callback);
    }
  })
}

var getPublish = function(id, callback) {
  db.query(`SELECT * FROM publish WHERE usrid = ?`, [id], function(err, rows) {
    if(err) {
      callback(err)
    }
    if(rows.length != 0) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  })
}

exports.addPublish = addPublish;
exports.getPublish = getPublish;