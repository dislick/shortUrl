var LoginModel = BaseModel.extend({

  // logs the user in
  // this does not need any validation, because this kind
  // of stuff happens on the server side.
  login: function(email, password) {
    var root = this;
    var postData = {
      email: email,
      password: password
    };

    this.request('POST', '/login', postData, function(data) {
      root.trigger((data.status == 'OK') ? 'success': 'error');
    });
  },

});
