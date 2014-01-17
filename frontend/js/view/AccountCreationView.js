var AccountCreationView = BaseView.extend({

  events: {
    'click #create': 'submitForm',
    'click #cancel': 'routeBack',
  },

  initialize: function() {
    this.render();
    this.listenTo(this.model, 'success', this.routeToApplication);
    this.listenTo(this.model, 'error', this.displayErrorMessage);
  },

  render: function() {
    var templateHtml = this.getTemplate('CreateAccount');
    this.$el.html(_.template(templateHtml, this.model.toJSON()));
  },

  submitForm: function() {
    var email = this.$('#email').val();
    var password1 = this.$('#password1').val();
    var password2 = this.$('#password2').val();

    if (password1 == password2) {
      this.model.createAccount(email, password1);  
    } else {
      this.displayErrorMessage('Your passwords do not match.');
    }
  },

  routeToApplication: function() {
    window.location.hash = '/home';
  },

  routeBack: function() {
    window.location.hash = '/login';
  },

  displayErrorMessage: function(message) {
    // create a new modal window dialogue with the exception message
    var errorMessage = new ModalWindowView({ 
      model: new ModalWindowModel({ 
        // displays either the variable 'message' OR the string literal
        // this is a commen practice in JavaScript
        message: message || 'Something went wrong, please try again.' 
      })
    });

    // render the modal window and append it to the document
    this.$el.append(errorMessage.render().$el);

    // focus the OK button after it has been appended to the document
    errorMessage.focusButton();
  },

});
