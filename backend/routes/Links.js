var auth = require('../modules/Authentication.js');

module.exports = function(app, db) {



  // GET /links/all
  // returns a JSON encoded array of link objects
  // returns a maximum of 50 links, sorted by time
  var getLinks = function(request, response) {
    var query = db.Schemas.Link.find({ owner: request.session.userId }).sort({ 'added': 'desc' }).limit(50);

    var sendQueryResults = function(error, results) {
      // declare array which we will later push to the client
      var responseData = [];

      if (error) {
        response.status(500).send();
        return false;
      }

      // remove _id and __v property from MongoDB      
      results.forEach(function(urlObject) {
        responseData.push({
          url: urlObject.url,
          shortUrl: urlObject.shortUrl,
          added: urlObject.added,
          clicks: urlObject.clicks
        });
      });

      // send new array to client
      response.send(responseData);
    };

    query.exec(sendQueryResults);
  };



  // POST /links/add
  // adds a new link to the database
  // needs a 'url' POST paramter
  // returns the generated shortUrl 
  var addLink = function(request, response) {
    var generateShortUrl = function(callback) {
      var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
      var length = 4;
      var newShortUrl = '';

      while(newShortUrl.length < length) {
        var randomNumber = Math.floor((Math.random() * letters.length));
        newShortUrl += letters[randomNumber];
      }

      // check if shortURL already exists
      // if it exists, call generateShortUrl recursively
      var doesShortUrlExists = function(error, count) {
        if (count > 0) {
          generateShortUrl(callback);
        } else {
          callback(newShortUrl);
        }
      };

      db.Schemas.Link.count({ shortUrl: newShortUrl }, doesShortUrlExists);      
    };

    /**
     * checks if a passed url is valid
     * @param  {string}  url 
     * @return {Boolean}     
     */
    var isUrlValid = function(url) {
      var checkUrlRegex = /^([a-zA-Z0-9]+?):\/\/.+$/;
      return url.match(checkUrlRegex);
    };

    // check if POST parameter 'url' is provided
    if (!request.body.url) {
      response.status(400).send();
      return false;
    }

    // assign the POST parameter to a variable for easy access
    var longUrl = request.body.url;

    // check if the provided url is valid
    if (!isUrlValid(longUrl)) {
      response.status(400).send();
      return false;
    }

    // save to url into mongodb
    var createUrl = function(shortUrl) {
      var link = new db.Schemas.Link({
        url: longUrl,
        shortUrl: shortUrl,
        added: new Date(),
        clicks: 0,
        owner: request.session.userId
      });

      link.save();

      // send the gernerated shortUrl back to the user
      response.send({
        shortLink: link.shortUrl
      });
      return true;
    };

    generateShortUrl(createUrl);
  };



  // POST /links/remove
  // removes a link from the database. also removes
  // all statistics for this URL.
  // needs a POST parameter 'shortUrl', which is the shortUrl
  var removeLink = function(request, response) {
    if (!request.body.shortUrl) {
      response.status(400).send();
      return false;
    }

    var parameterShortUrl = request.body.shortUrl;

    var removeLink = function(error) {
      if (error) {
        response.status(500).send();
        return false;
      } else {
        response.status(200).send();
        return true;
      }
    };

    db.Schemas.Link.remove({ shortUrl: parameterShortUrl, owner: request.session.userId }, removeLink);
  };



  app.get('/links/all', auth.checkAuth, getLinks);
  app.post('/links/add', auth.checkAuth, addLink);
  app.post('/links/remove', auth.checkAuth, removeLink);
};
