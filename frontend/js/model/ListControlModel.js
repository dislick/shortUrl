var ListControlModel = BaseModel.extend({

  defaults: {
    currentYear: 2014,
    author: 'Patrick Muff'
  },

  // update the current year on initialization
  initialize: function() {
    this.set('currentYear', this.getCurrentYear());
    this.getCurrentUser();
  },

  // returns an integer of the current year
  // ex: 2014
  getCurrentYear: function() {
    return (new Date()).getFullYear();
  },

  // makes a POST request and triggers a change event after it has set
  // the current logged in user of the application.
  getCurrentUser: function() {
    var root = this;
    this.request('GET', '/account/currentUser', {}, function(data) {
      root.set('currentUser', data.email);
    });
  },

});
