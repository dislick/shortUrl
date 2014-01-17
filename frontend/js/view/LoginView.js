var LoginView = BaseView.extend({

  events: {
    'click #submit':         'submitForm',
    'click #create-account': 'routeToAccountCreation',
    'keypress #password':    'submitFormOnEnter',
    'keypress #email':       'submitFormOnEnter',
  },

  initialize: function() {
    this.render();
    this.listenTo(this.model, 'success', this.routeToApplication);
    this.listenTo(this.model, 'error', this.displayErrorMessage);
  },

  render: function() {
    var templateHtml = this.getTemplate('Login');
    this.$el.html(_.template(templateHtml, this.model.toJSON()));
  },

  submitForm: function() {
    var email = this.$('#email').val();
    var password = this.$('#password').val();

    this.model.login(email, password);
  },

  // if the user presses the Enter key, call .submitForm() for UX
  submitFormOnEnter: function(event) {
    if (event.keyCode == 13) {
      this.submitForm();
    }
  },

  routeToApplication: function() {
    window.location.hash = '/home';
  },

  routeToAccountCreation: function() {
    window.location.hash = '/account/create';
  },

  displayErrorMessage: function() {
    // create a new modal window dialogue with the exception message
    var errorMessage = new ModalWindowView({ 
      model: new ModalWindowModel({ 
        message: 'Something went wrong, please try again.' 
      })
    });

    // render the modal window and append it to the document
    this.$el.append(errorMessage.render().$el);

    // focus the OK button after it has been appended to the document
    errorMessage.focusButton();
  },

});
