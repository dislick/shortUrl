// renders the 'shortUrl' text on top of the page
var HeaderView = BaseView.extend({

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.getTemplate('Header'));
  },

});
