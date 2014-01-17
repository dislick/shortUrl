var crypto = require('crypto');
var auth = require('../modules/Authentication.js');

module.exports = function(app, db) {



  // GET /
  // returns the frontend application to the user
  // can also be accessed via /public/client.html
  var sendClient = function(request, response) {
    response.sendfile(require('path').resolve(__dirname + '/../../public/client.html'));
  };



  // POST /login
  // this is the authorization process for the user
  // parameters:
  //    'email'
  //    'password'
  var login = function(request, response) {
    var post = request.body;
    var md5sum = crypto.createHash('md5');
    
    // quick access variable to email
    var email = post.email;
    // generate MD5 hash of password
    var hashedPassword = md5sum.update(post.password).digest("hex");

    var foundUserCallback = function(error, user) {
      if (error) {
        response.status(500).send();
        return false;
      }

      if (user) {
        // login successful, set session variables
        request.session.userId = user._id;

        // redirect user to frontend application
        response.send({ status: 'OK' });
        return true;
      } else {
        response.send({ status: 'unauthorized' });
      }
    };

    db.Schemas.User.findOne({ email: email, password: hashedPassword }, foundUserCallback);
  };



  // GET /logout
  // destroys session variables and logs the user out
  // after this, it redirects him to the frontend application
  var logout = function(request, response) {
    delete request.session.userId;
    response.redirect('/');
  };



  // GET /account/currentUser
  // returns the email adress of the current user
  var currentUser = function(request, response) {
    var foundUserCallback = function(error, user) {
      if (error) {
        response.status(500).send();
      }

      // send a json object with the users email back
      response.send({ email: user.email });
    };

    db.Schemas.User.findOne({ _id: request.session.userId }, foundUserCallback);
  };



  // POST /account/create
  // creates a new account
  // parameters:
  //    'email'
  //    'password' 
  var createAccount = function(request, response) {
    var post = request.body;
    var md5sum = crypto.createHash('md5');

    // create easier to remember variables for email and password
    var email = post.email;
    var password = post.password;

    // MD5 hash the password using crypto
    var hashedPassword = md5sum.update(post.password).digest("hex");

    /**
     * check is a passed email adress is valid
     * @param  {string}  email 
     * @return {Boolean}       
     */
    var isEmailValid = function(email) {
      var validateEmail = /[a-zA-Z0-9!#$%&'*+\-\./=?^_`{|}~]+?@\w+?\.\w+/;
      return validateEmail.test(email);
    };

    /**
     * checks if a passed password is valid
     * @param  {string}  password 
     * @return {Boolean}          
     */
    var isPasswordValid = function(password) {
      var validatePassword = /^.{6,}$/;
      return validatePassword.test(password);
    };

    // actually check whether the passed POST variables are valid
    if (!isEmailValid(email) || !isPasswordValid(password)) {
      response.send({ status: 'invalid request' });
      return false;
    }    

    // check if the users email already exists or not
    var doesUserExistCallback = function(error, results) {
      if (error) {
        // if there was any error with the database connection, send
        // HTTP status 500 back to the user.
        response.status(500).send();
        return false;
      }

      if (results.length > 0) {
        response.send({ status: 'duplicate' });
        return false;
      }

      // does not exists, continue.
      createUser();
    };

    // create a new mongoDB schema object and save it to the database
    var createUser = function() {
      var user = new db.Schemas.User({
        email: email,
        password: hashedPassword
      });
      user.save();
      response.send({ status: 'OK' });
    };

    db.Schemas.User.find({ email: email }, doesUserExistCallback);
  };


  
  app.get('/', sendClient);
  app.post('/login', login);
  app.get('/logout', logout);
  app.post('/account/create', createAccount);
  app.get('/account/currentUser', auth.checkAuth, currentUser);
};
