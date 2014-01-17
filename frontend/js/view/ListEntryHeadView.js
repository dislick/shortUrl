// this view renders the first table row:
// LongURL  |  Created  |  Clicks  |  Short URL
// 
// this is an implementation of the subview pattern
var ListEntryHeadView = BaseView.extend({

  // set the tag name to table row with the class 'header'
  // backbone automatically generates a <tr> element that we can use
  tagName: 'tr',
  className: 'header',

  events: {
    'click #clicks':     'sortByClicks',
    'click #created':    'sortByCreated',
  },

  render: function() {
    var templateHtml = this.getTemplate('ListEntryHead');
    this.$el.html(templateHtml);

    // highlight the column currently sorted
    this.markSortedColumn(this.collection.comparatorOptions.comparatorName);

    // allow chainability
    return this;
  },

  sortByClicks: function() {
    this.collection.sortByColumn('clicks');
  },

  sortByCreated: function() {
    this.collection.sortByColumn('created');
  },

  markSortedColumn: function(columnSelector) {
    this.$('#' + columnSelector).addClass('sorted');
  },

});
