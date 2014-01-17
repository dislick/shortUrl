// class/object Exception which can be used
// when throwing errors with string messages.
// 
// this is encapsulated in a JavaScript closure so
// it does not clutter up 'window' with not needed
// global variables.
var Exception = (function() {

  var Exception = function(message) {
    this.message = message;
    this.logError();
  };

  Exception.prototype.getMessage = function() {
    return this.message;
  };

  Exception.prototype.setMessage = function(message) {
    this.message = message;
  };

  // write error to console if console is defined
  // the if clause is used to make sure the code does not 
  // break in older IE versions.
  Exception.prototype.logError = function() {    
    if (console.error) {
      console.error(this.getMessage());
    }
  };

  return Exception;

}).call();
