var ListView = BaseView.extend({

  tagName: 'table',
  className: 'table table-nohover table-list max-width',

  initialize: function() {
    // set event listener (observer pattern)
    this.listenTo(this.collection, 'finished sort destroy marked change:marked', this.render);
  },

  render: function() {
    var root = this;

    // reset $el element
    this.$el.html('');

    // set table titles (LongURL, Created, Clicks, ShortURL)
    var headView = new ListEntryHeadView({ collection: this.collection });
    this.$el.append(headView.render().$el);

    // set table entries (subview pattern)
    this.collection.forEach(function(item) {
      var subView = new ListEntryView({ model: item });
      root.$el.append(subView.render().$el);
    });
  },

});
