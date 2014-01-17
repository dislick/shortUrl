var ListEntryView = BaseView.extend({

  // define the tag name of the $el element
  // this is a table row, therefore we set it to 'tr'
  tagName: 'tr',

  events: {
    'click .copy':         'selectInput',
    'blur .copy':          'hideTooltip',
    'click td.clickable':  'setMarkedState',
  },

  render: function() {
    var templateHtml = this.getTemplate('ListEntry');
    var renderedHtml = _.template(templateHtml, this.model.toJSON());
    
    this.$el.html(renderedHtml);

    // after the row has been rendered, set a new textbox width
    // this is because different host names have different lengths
    this.setTextboxWidth();

    // set the yellow background color of the row if the
    // model has been marked by the user
    this.setBackgroundColor();

    // if the url has just been added, hightlight it quickly
    if (this.model.get('freshlyAdded')) {
      this.highlight();

      // now set 'freshlyAdded' to false, as it should highlight it again
      this.model.set('freshlyAdded', false);
    }

    // return the view object to allow chainability
    // this enables us to write view.render().$el
    return this;
  },

  // selects the shortUrl and displays the "Press Ctrl-C to copy" tooltip
  selectInput: function(event) {
    // insert a 'http://' in front of the url when it is focused.
    // this allows the user to copy & paste it with a protocol while not
    // wasting space in the table.
    this.$('.copy').val('http://' + this.model.get('redirectUrl'));

    // select the whole textbox and display the tooltip
    this.$('.copy').select();
    this.showTooltip();
  },

  showTooltip: function() {
    this.$('.copy-note').show();
  },

  hideTooltip: function(event) {
    this.$('.copy-note').hide();

    // reset the 'http://'
    this.$('.copy').val(this.model.get('redirectUrl'));
  },

  // set the textbox width depending on the text length
  // after that, set margin-left of the tooltip
  setTextboxWidth: function() {
    var charLength = this.$('.copy').val().length;
    this.$('.copy').width(charLength * 7);

    var fieldWidth = this.$('.copy').width();
    this.$('.copy-note').css('margin-left', fieldWidth + 15);
  },

  setBackgroundColor: function() {
    if (this.model.get('marked')) {
      this.$el.addClass('yellow');

      // also add the yellow class to the copy textbox
      // without this line, it would have a white background
      this.$('.copy').addClass('yellow');
    }
  },

  setMarkedState: function() {
    this.model.flipMarkedState();
  },

  highlight: function() {
    this.$el.fadeIn(500);
  },

});
