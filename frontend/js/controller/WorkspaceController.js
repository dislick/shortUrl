// controllers in backbone are not like traditional MVC controllers.
// while normal controllers handle all GUI actions, the views and models handle this
// by themselfs in backbone. controllers are only used to make page transitions and
// to keep track of all views.
var WorkspaceController = Backbone.Router.extend({

  // when the user navigates to /#/home, the method 'displayHome' gets called
  // all routes can be declared in this routes object or manually via .route()
  routes: {
    'home': 'renderUrlShortener',
    'login': 'renderLogin',
    'account/create': 'renderAccountCreation',
  },

  // navigate to /#/home when the router gets initialized
  initialize: function() {
    if (window.location.hash == '') {
      window.location.hash = '/home';
    }
  },

  // clear all sections of the document to render a new page
  // for the user. new sections can easily be added to the array.
  clearDocument: function() {
    var sections = [
      $('#list-controls'),
      $('#list'),
      $('#header'),
      $('#list-top-controls')  
    ];
    
    sections.forEach(function($section) {
      $section.html('');
    });
  },

  // render the list of recent shortURLs
  // this also includes the controls (remove button) on the bottom
  renderUrlShortener: function() {
    // simply displays the "shortUrl" logo on top of the page
    var headerView   = new HeaderView();
    
    // the collection which holds all links
    var list         = new ListCollection();
    
    // the corresponding view for the collection
    var listView     = new ListView({ collection: list });
    
    // the view which allows the user to add new links (textbox and blue button)
    var addEntryView = new ListAddEntryView({ collection: list });
    
    // the remove button and copyright text
    var controlView  = new ListControlView({ collection: list, model: new ListControlModel() });
    
    // this view sets the document a fixed height to keep it from resetting
    var documentView = new DocumentView({ collection: list });

    // put the rendered view into the DOM
    $('#list-controls').html(controlView.$el);
    $('#list').html(listView.$el);
    $('#header').html(headerView.$el);
    $('#list-top-controls').html(addEntryView.$el);
  },

  // renders the Login screen after it clears the document
  renderLogin: function() {
    this.clearDocument();    

    var view = new LoginView({ model: new LoginModel() });
    $('#list').append(view.$el);
  },

  // renders the Account Creation screen after it clears the document
  renderAccountCreation: function() {
    this.clearDocument();

    var view = new AccountCreationView({ model: new AccountCreationModel() });
    $('#list').append(view.$el);
  },

});
