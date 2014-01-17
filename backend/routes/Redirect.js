module.exports = function(app, db) {



  // GET /:shortUrl
  // redirects the user to the actual URL
  // and adds +1 to the 'count' of said shortUrl
  var redirect = function(request, response) {
    // check if GET parameter shortUrl is provided
    if (!request.params.shortUrl) {
      response.status(400).send();
      return false;
    }

    var shortUrl = request.params.shortUrl;
    var checkShortUrl = new RegExp('^[a-zA-Z0-9]{4}$');

    // use RegExp to check if the shortUrl is valid
    if (!checkShortUrl.test(shortUrl)) {
      response.status(400).send();
      return false;
    }

    // declare redirect callback
    var redirectUser = function(error, dbLink) {
      if (error) {
        response.status(500).send();
        return false;
      }

      if (!dbLink) {
        response.status(404).send('404');
        return false;
      }

      // user gets redirected on this line, the request ends
      // here for him, while the server is still doing some work
      response.redirect(dbLink.url);

      // add +1 to the click count and save it
      dbLink.clicks += 1;
      dbLink.save();
      
      return true;
    }

    db.Schemas.Link.findOne({ shortUrl: shortUrl }, redirectUser);
  };

  

  app.get('/:shortUrl', redirect);
};