// this view renders the "Remove" button on
// the bottom of the page.
var ListControlView = BaseView.extend({

  events: {
    'click #remove': 'removeLinks',
    'click #reload': 'reloadLinks',
    'click #logout': 'logout',
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.collection, 'change:marked add remove reset', this.setRemoveButtonState);
  },

  // render the view with no model or collection data
  // this allows us to display the current year in this string:
  // "(c) 2014 by Patrick Muff"
  render: function() {
    var renderedHtml = _.template(this.getTemplate('ListControl'), this.model.toJSON());
    this.$el.html(renderedHtml);

    this.setRemoveButtonState();
  },

  // enable or disable the remove button everytime something gets 
  // marked by a user.
  setRemoveButtonState: function() {
    if (this.collection.hasSomethingSelected()) {
      this.$('#remove').removeClass('btn-disabled').attr('disabled', false);
    } else {
      this.$('#remove').addClass('btn-disabled').attr('disabled', true);
    }
  },

  removeLinks: function() {
    this.collection.removeSelectedLinks();
  },

  reloadLinks: function() {
    this.collection.loadList();
  },

  logout: function() {
    window.location = '/logout';
  },

});
