var db = require('./db');

var createInvoice = function(body, filename, callback) {
  db.query(`
    INSERT INTO invoice (payment, amount, transfer, receipt, invoice, invoicedate, total, usrid, filename) values(?,?,?,?,?,?,?,?,?)
  `, [body.payment, body.amount, body.transfer, body.receipt, body.invoice, body.invoicedate, body.total, body.usrid, filename], function(err) {
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

var addInvoice = function(body, filename, callback) {
  db.query(`
    SELECT * FROM invoice WHERE payment = ? AND amount = ? AND transfer = ? AND receipt = ? AND invoice = ? AND invoicedate = ? AND total = ? AND usrid = ?
  `, [body.payment, body.amount, body.transfer, body.receipt, body.invoice, body.invoicedate, body.total, body.usrid], function(err, rows) {
    if(err) {
      return callback(err);
    } else if(rows.length > 0) {
      return callback(err, false);
    } else {
      return createInvoice(body, filename, callback);
    }
  })
}

var updateInvoice = function(body, filename, callback) {
  console.log(body)
  if(filename != null) {
    db.query(`
      UPDATE invoice SET ? WHERE id = ?
    `, [{payment: body.payment, amount: body.amount, transfer: body.transfer, receipt: body.receipt,
        invoice: body.invoice, invoicedate: body.invoicedate, total: body.total, filename: filename}, body.oldid], function(err) {
      if(err) {
        callback(err) ;
      } else {
        callback(null);
      }
    })
  } else {
    db.query(`
      UPDATE invoice SET ? WHERE id = ?
    `, [{payment: body.payment, amount: body.amount, transfer: body.transfer, receipt: body.receipt,
        invoice: body.invoice, invoicedate: body.invoicedate, total: body.total}, body.oldid], function(err) {
      if(err) {
        callback(err) ;
      } else {
        callback(null);
      }
    })
  }  
}

var removeInvoice = function(body, callback) {
  db.query(` DELETE FROM invoice WHERE id = ?`, [body.id], function(err) {
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

var loadInvoice = function(id, callback) {
  console.log(id);
  db.query('SELECT * FROM invoice WHERE usrid = ?', [id], function(err, rows) {
    if(err) {
      return callback(err);
    } else {
      return callback(null, rows);
    }
  })
}

exports.addInvoice = addInvoice;
exports.loadInvoice = loadInvoice;
exports.updateInvoice = updateInvoice;
exports.removeInvoice = removeInvoice;