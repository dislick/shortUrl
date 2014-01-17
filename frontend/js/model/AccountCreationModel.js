var AccountCreationModel = BaseModel.extend({

  createAccount: function(email, password) {
    var root = this;
    var postData = {
      email: email,
      password: password
    };

    if (!this.isEmailValid(email)) {
      this.trigger('error');
      return false;
    }

    this.request('POST', '/account/create', postData, function(data) {
      // implements registry pattern in JavaScript
      var eventMap = [
        { status: 'OK', event: 'success' },
        { status: 'duplicate', event: 'error' },
        { status: 'invalid request', event: 'error' },
      ];

      // contains either 'success' or 'error', depending on returned status
      var correspondingEvent = (_.findWhere(eventMap, { status: data.status })).event;

      // if the account creation was successful, log the user in
      if (correspondingEvent == 'success') {
        var loginModel = new LoginModel();
        loginModel.login(email, password);

        loginModel.on('success', function() {
          root.trigger(correspondingEvent);
        });

        // abort method here
        return true;
      }
      
      // login was not successful, trigger an error event
      root.trigger(correspondingEvent);
    });
  },

  isEmailValid: function(email) {
    var validateEmail = /[a-zA-Z0-9!#$%&'*+\-\./=?^_`{|}~]+?@\w+?\.\w+/;
    return validateEmail.test(email);
  },

});
