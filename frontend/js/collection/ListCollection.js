var ListCollection = BaseCollection.extend({

  model: ListEntryModel,

  initialize: function() {
    this.loadList();

    // set comparator options
    // these options are used to sort the collection
    this.comparatorOptions = {
      comparatorName: 'created',
      createdSortOrder: true,
      clickSortOrder: true,
    };
    this.sortByColumn('created');
  },

  // make an AJAX call to /links/all and load the response into
  // this collection. this triggers a 'finished' event which tells
  // the view to render itself.
  loadList: function() {
    var root = this;

    this.request('GET', '/links/all', null, function(data) {
      root.reset(data).trigger('finished');
    });
  },

  // sorts the collection based on the column name
  // this uses backbone comparators: http://backbonejs.org/#Collection-comparator
  // a comparator is used to determine how the collection should be sorted
  sortByColumn: function(column) {
    var root = this;

    var sortOptions = [
      {
        columnName: 'clicks',
        orderValue: 'clickSortOrder',
        comparator: function(link) {
          return (root.comparatorOptions.clickSortOrder ? 1 : -1) * link.get('clicks'); 
        }
      },
      {
        columnName: 'created',
        orderValue: 'createdSortOrder',
        comparator: function(link) {
          return (root.comparatorOptions.createdSortOrder ? 1 : -1) * (new Date(link.get('added')).getTime());
        }
      }
    ];

    // find the passed column name
    var sortItem = _.findWhere(sortOptions, { columnName: column });

    // switch the order of the column (asc or desc)
    this.comparatorOptions[sortItem.orderValue] = !this.comparatorOptions[sortItem.orderValue];

    // apply the comparator to the collection
    this.comparator = sortItem.comparator;
    this.comparatorOptions.comparatorName = sortItem.columnName;

    // sort the collection which triggers a 'sort' event
    // this sort event re-renders the corresponding view
    this.sort()
  },

  // call .removeLink() for each model that has been marked by the user.
  removeSelectedLinks: function() {
    this.forEach(function(model) {
      if (model.get('marked')) {
        model.removeLink();
      }      
    });
  },

  // checks if any model has been marked/selected
  hasSomethingSelected: function() {
    // find all models that are marked
    var results = this.find(function(model) {
      return model.get('marked');
    });

    // cast the array into a boolean 
    // -> this returns true if it has any array entries, false if not
    return Boolean(results);
  },

  // makes a POST request to the server, adding a new URL to the collection
  addUrl: function(inputUrl) {
    var root = this;
    
    // abort method if the regex does not match
    if (!this.isUrlValid(inputUrl)) {
      throw new Exception('Your URL is not valid, please make sure you have entered it correctly.');
    }
    
    this.request('POST', '/links/add', { url: inputUrl }, function(data) {
      // create a new local model and add it to the collection.
      // with this, we do not need to reload the whole collection and
      // everything runs much faster.
       var newUrlModel = new ListEntryModel({
        url: inputUrl,
        shortUrl: data.shortLink,
        added: new Date(),
        clicks: 0,
        freshlyAdded: true,        
      });

       // root refers to this collection
      root.add(newUrlModel);
    });
  },

  // checks if a URL is valid
  // returns a boolean
  isUrlValid: function(url) {
    var checkUrlRegex = /^([a-zA-Z0-9]+?):\/\/.+$/;
    return url.match(checkUrlRegex);
  }

});
