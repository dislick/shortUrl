var BaseView = Backbone.View.extend({

  // gets a HTML template from the $templates variable and
  // returns it. this is in BaseView so that every view can
  // us this method.
  getTemplate: function(id) {
    return App.$templates.find('#' + id).html();
  },

});
