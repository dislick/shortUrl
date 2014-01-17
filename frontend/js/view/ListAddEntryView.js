var ListAddEntryView = BaseView.extend({

  events: {
    'click #shorten': 'addUrl',
    'keypress #input-field': 'addUrlViaEnter',
    'keyup #input-field': 'updateButtonState',
  },

  initialize: function() {
    this.render();    
  },

  render: function() {
    this.$el.html(this.getTemplate('AddEntry'));
  },

  // update the 'Shorten' button state
  // when there is no text in #input-field, the button
  // stays disabled and is not clickable.
  updateButtonState: function() {
    var url = this.$('#input-field').val().trim();

    if (!this.collection.isUrlValid(url)) {
      this.$('#shorten').addClass('btn-disabled').attr('disabled', true);
    } else {
      this.$('#shorten').removeClass('btn-disabled').attr('disabled', false);
    }
  },

  addUrl: function() {
    var inputUrl = this.$('#input-field').val();

    try {
      // try to add the url to the collection and POST it to the server.
      // we pass it the raw input, all checks to see whether it is valid are
      // made by the collection itself.
      this.collection.addUrl(inputUrl);

    } catch (exception) {
      // create a new modal window dialogue with the exception message
      var errorMessage = new ModalWindowView({ model: new ModalWindowModel({ message: exception.getMessage() }) });

      // render the modal window and append it to the document
      this.$el.append(errorMessage.render().$el);

      // focus the OK button after it has been appended to the document
      errorMessage.focusButton();
    }

    this.focusInputField();
  },

  addUrlViaEnter: function(event) {
    if (event.keyCode == 13) {
      this.addUrl();
    }
  },

  focusInputField: function() {
    this.$('#input-field').val('');
    this.updateButtonState();
  },

});
