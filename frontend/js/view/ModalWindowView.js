var ModalWindowView = BaseView.extend({

  className: 'modal-window',
  fadingSpeed: 200,

  events: {
    'click #ok': 'fadeOutRemove',
  },

  render: function() {
    var templateHtml = this.getTemplate('ModalWindow');
    this.$el.html(_.template(templateHtml, this.model.toJSON()));

    // fade the whole view in
    this.$el.fadeIn(this.fadingSpeed);

    // maintain chainability
    return this;
  },

  focusButton: function() {
    this.$('#ok').focus();
  },

  fadeOutRemove: function() {
    // fade the whole view out
    this.$el.fadeOut(this.fadingSpeed);

    // remove the view completely after it has been faded out
    var root = this;
    setTimeout(function() {
      root.remove();
    }, this.fadingSpeed);
  },

});
