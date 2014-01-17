var requestMethod = {
  request: function(method, url, data, callback) {
    $.ajax({
      url: url,
      type: method,
      data: data,
      cache: false,
      success: function(response) {
        callback(response);
      },
      error: function(jqXHR, textStatus, err) {
        // debugging purposes
        console.log(jqXHR);

        if (jqXHR.status == 401) {
          // user is not logged in, redirect to /#/login
          window.location.hash = '/login';
        }
      }
    });
  }
}

// every model in this application inherits its properties and methods from
// BaseModel. BaseModel contains a request() method for easier access to
// the jQuery AJAX function.
var BaseModel = Backbone.Model.extend(requestMethod);
var BaseCollection = Backbone.Collection.extend(requestMethod);
