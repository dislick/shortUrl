var ListEntryModel = BaseModel.extend({

  // these are member variables of this model
  // we can access them with model.get('variable')
  defaults: {
    maxUrlLength: 50,
    marked: false,
  },

  initialize: function() {
    this.formatDateString();
    this.shortenDisplayUrl();
    this.setRediretUrl();
  },

  // send an API request to remove the shortened URL
  // after it has been sent, destroy the model which causes the 
  // view to render again --> deleting it from the GUI.
  removeLink: function() {
    var root = this;
    this.request('POST', '/links/remove', { shortUrl: this.get('shortUrl') }, function(data) {
      root.destroy();
    });
  },

  flipMarkedState: function() {
    this.set('marked', !this.get('marked'));
  },

  formatDateString: function() {
    // creates a Date object out of the 'added' string
    // 'added' is a JSON-encoded date object string
    var dateAdded = Date.parse(this.get('added'));

    // uses the humanized_time_span.js plugin
    // https://github.com/layam/js_humanized_time_span
    this.set('dateString', humanized_time_span(dateAdded));
  },

  // URLs are too long to display in the table, therefore we
  // need to shorten it to maxUrlLength and add '...' at the end.
  // this string is saved into the member variable 'displayUrl'
  shortenDisplayUrl: function() {
    var url = this.get('url');
    var maxUrlLength = this.get('maxUrlLength');

    if (url.length > maxUrlLength) {
      var cuttedUrl = url.substring(0, maxUrlLength) + '...';
      this.set('displayUrl', cuttedUrl);
    } else {
      this.set('displayUrl', url);
    }
  },

  setRediretUrl: function() {
    var host = window.location.host;
    this.set('redirectUrl', host + '/' + this.get('shortUrl'));
  },

});
