// we need this view to set a fix page height.
// without a fixed page height, the document gets reset every
// time the list is rendered. since its rendered a lot (every time a
// user marks a link), it would be annoying and hinder the workflow.
var DocumentView = BaseView.extend({

  el: $('html'),

  initialize: function() {
    // listen to the collection events to set a new page height 
    // when appropriate.
    this.listenTo(this.collection, 'finished sort destroy marked change:marked', this.setFixPageHeight);
  },

  setFixPageHeight: function() {
    this.$el.css('height', $(document).height());    
  },

});
