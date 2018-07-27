var db = require('./db');

var createTerm = function(body, filename, callback) {
  db.query(`
    INSERT INTO terms (ver, sub, revisedate, site, filename) values(?,?,?,?,?)
  `, [body.version, body.subject, body.revisedate, body.site, filename], function(err) {
    if(err){
      if (err.code === 'ER_DUP_ENTRY') {
        // If we somehow generated a duplicate user id, try again
        return create(body, filename, callback);
      }
      return callback(err);
    }
    return callback(null, true);
  })
}

var addTerm = function(body, filename, callback) {
  db.query(`
    SELECT * FROM terms WHERE ver = ? AND sub = ? AND site = ?
  `, [body.version, body.subject, body.site], function(err, rows) {
    if(err) {
      return callback(err);
    } else if(rows.length > 0) {
      return callback(err, false);
    } else {
      return createTerm(body, filename, callback);
    }
  })
}

var updateTerm = function(body, filename, callback) {
  db.query(`
    UPDATE terms SET ? WHERE id = ?
  `, [{ver: body.version, sub: body.subject, revisedate: body.revisedate, site: body.site, filename: filename}, body.oldid], function(err) {
    if(err) {
      callback(err) ;
    } else {
      callback(null);
    }
  })
}

var removeTerm = function(body, callback) {
  db.query(`DELETE FROM terms WHERE id = ?`, [body.oldid], function(err) {
    if(err) {
      console.log(err);
      callback(err);
    } else {
      callback(null);
    }
  })
}

var loadTerms = function(site, callback) {
  if(site && site != -1) {
    db.query('SELECT * FROM terms where site = ?', [site], function(err, rows) {
      if(err) {
        return callback(err);
      } else {
        return callback(null, rows);
      }
    })
  } else {
    db.query('SELECT * FROM terms', [], function(err, rows) {
      if(err) {
        return callback(err);
      } else {
        return callback(null, rows);
      }
    })
  }  
}

exports.addTerm = addTerm;
exports.loadTerms = loadTerms;
exports.updateTerm = updateTerm;
exports.removeTerm = removeTerm;