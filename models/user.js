var bcrypt = require('bcrypt-nodejs');
var uuidV4 = require('uuid/v4');
var dateFormat = require('dateformat');

var db     = require('./db');
// Set up User class
var User = function(user) {
  var that = Object.create(User.prototype);

  that.id       = user.id;
  that.email    = user.email;
  that.password = user.password;

  return that;
};

// Gets a random id for this user
var generateUserId = function() {
  return uuidV4();
};

// Hash and salt the password with bcrypt
var hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check if password is correct
var validPassword = function(password, savedPassword) {
  return bcrypt.compareSync(password, savedPassword);
};

// Create a new user
// callback(err, newUser)
var createUser = function(firstname, lastname, email, password, type = 0, site, status = 0, contractdate, callback) {
  var newUser = {
    id: generateUserId(),
    email: email,
    password: hashPassword(password)
  };
  
  db.query('INSERT INTO users ( id, firstname, lastname, email, password, type, site, status, contractdate ) values (?,?,?,?,?,?,?,?,?)',
    [newUser.id, firstname, lastname, email, newUser.password, type, site, status, contractdate],
    function(err) {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate user id, try again
          return createUser(firstname, lastname, email, password, type, site, status, contractdate, callback);
        }
        return callback(err);
      }

      // Successfully created user
      return callback(null, new User(newUser));
    }
  );
};

// Check if a user exists and create them if they do not
// callback(err, newUser)
var signup = function(req, email, password, callback) {
  // Check if there's already a user with that email
  db.query('SELECT * FROM users WHERE email = ?', [email], function(err, rows) {
    if (err)
      return callback(err);

    if (rows.length) {
      return callback(null, false, req.flash('signupMessage', 'An account with that email address already exists.'));
    } else {
      // No user exists, create the user
      //[newUser.id, newUser.email, newUser.password, req.body.FirstName, req.body.LastName, req.body.Department, req.body.PhoneNumber, false],
      //factory, department, line, name, position, email, password, phone, type, status
      return createUser(req.body.FirstName, req.body.LastName, email, password, 0, -1, 1, req.body.contractdate, callback);
    }
  });
};

// Log in a user
// callback(err, user)
var login = function(req, email, password, callback) {  
  // Check that the user logging in exists
  db.query('SELECT * FROM users WHERE email = ?', [email], function(err, rows) {
    if (err)
      return callback(err);

    if (!rows.length)
      return callback(null, false, req.flash('loginMessage', 'Usuario no encontrado.'));

    if (!validPassword(password, rows[0].password))
      return callback(null, false, req.flash('loginMessage', 'Contraseña Incorrecta.'));

    if (rows[0].status == 0){
      return callback(null, false, req.flash('loginMessage', 'Esperando permitir permiso.'));
    }
    // User successfully logged in, return user
    return callback(null, new User(rows[0]));
  });
};

var verify = function(id, callback){
  db.query('UPDATE users SET active = 1 WHERE id = ?', [id], function(err, result){
    if(err)
      return callback(err);
    return callback(null);
  })
}

var addUser = function(body, callback){
  db.query('SELECT * FROM users WHERE email = ?', [body.email], function(err, rows) {
    if (err)
      return callback(err);

    if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user
      return createUser(body.firstname, body.lastname, body.email,'12345', body.type, body.site, body.status, body.contractdate, callback);
    }
  });
}
var getUsers = function(callback){
  db.query('SELECT u.* FROM users as u', [], function(err, rows) {
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}
var getUser = function(email, callback){
  db.query('SELECT * FROM users WHERE email = ?', [email], function(err, rows) {
    if (err)
      return callback(err);
    if (rows.length == 1) {
      return callback(null,rows[0]);
    }else{
      return callback(null, null);
    }
  });
}
var getUserByID = function(id, callback) {
  db.query(`SELECT users.*, publish.id as p_id  FROM users
            LEFT JOIN publish ON users.id = publish.usrid WHERE users.id = ?`, [id], function(err, rows) {
    if (err)
      return callback(err);
    if (rows.length == 1) {
      return callback(null,rows[0]);
    }else{
      return callback(null, null);
    }
  });
}
var updateUser = function(data, callback){
  db.query('UPDATE users SET ? WHERE id = ?', [{password: hashPassword(data.pwd)}, data.id], function(err, user){
    if (err)
      return callback(err);
    else{
      return callback(null, user);
    }
  })
}
var updateUserInfo = function(data, callback){
  db.query('UPDATE users SET ? WHERE email = ?', 
    [{
      email: data.email, firstname: data.firstname, lastname: data.lastname,
      type: data.type, site: data.site, status: data.status, contractdate: data.contractdate
    }, data.oldemail], function(err, user){
    if (err)
      return callback(err);
    else{
      return callback(null, user);
    }
  })
}

var getAccept = function(id, callback) {
  const yyyymmdd  = function(date) {
    return dateFormat(date, "yyyy mm dd hh:MM:ss TT");
    // var mm = date.getMonth() + 1; // getMonth() is zero-based
    // var dd = date.getDate();

    // return [date.getFullYear(),
    //         (mm>9 ? '' : '0') + mm,
    //         (dd>9 ? '' : '0') + dd
    // ].join('-');
  }
  db.query('UPDATE users SET ? WHERE id = ?',
    [{ acceptdate: yyyymmdd(new Date())}, id], function(err, user) {
      return callback(err);
  })
}

exports.signup = signup;
exports.login = login;
exports.verify = verify;
exports.addUser = addUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.updateUserInfo = updateUserInfo;
exports.getAccept = getAccept;
exports.getUserByID = getUserByID;