// declare global variable 'App'
var App = {};

// encapsulate the ajax call
(function() {

  var initializeController = function(data) {
    // save all templates to a variable
    App.$templates = $('<div/>').html(data);

    // initialize the app router
    App.Router = new WorkspaceController();

    // start listening on URL changes
    Backbone.history.start();
  };

  // load template file on start
  $.ajax({
    url: '/compiled-source/templates.tpl',
    type: 'GET',
    cache: false,
    success: initializeController, // call initializeController when it has been successful
                                   // this is the Seperate Callback pattern applied
    error: function(jqXHR, textStatus, err) {
      console.log(jqXHR);
    }
  });

})();
