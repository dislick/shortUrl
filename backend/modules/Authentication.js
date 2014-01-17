module.exports = {
   
  // middleware to check if a user is authorized.
  // this is used at the very bottom of the file.
  checkAuth: function(request, response, next) {
    if (!request.session.userId) {
      // send HTTP status code 401 (Unauthorized) back
      // if session variable does not exist
      response.status(401).send();
    } else {
      // call next if the variable is set to continue
      // with the request.
      next();
    }
  }

};
