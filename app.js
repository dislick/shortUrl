// dependencies and modules
var express = require('express');
var db = require('mongoose');
var generalConfig = require('./backend/modules/Configuration.js');

// create an Express application
// more information: http://expressjs.com/api.html 
var app = express();
app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.cookieParser());
  app.use(express.session({
    secret :'geheimer string für die session hashes.'
  }));
});


// set static directories
// these can be configured in the Configuration module
generalConfig.staticDirectories.forEach(function(folder) {
  app.use(folder, express.static(__dirname + folder));
});

// connect the MongoDB, exit if unsuccessfully
db.connect(generalConfig.mongoDB, function(error, response){
  if (error) {
    console.log('MongoDB wurde nicht gefunden, Applikation wird beendet.');

    // close application
    process.exit(0);
  }

  // continue to setRoutes after MongoDB has been connected
  setRoutes();
});

var setRoutes = function() {
  db.Schemas = {
    Link: require('./backend/schemas/LinkSchema.js')(db),
    User: require('./backend/schemas/UserSchema.js')(db),
  };

  require('./backend/routes/Client.js')(app, db);
  require('./backend/routes/Links.js')(app, db);
  require('./backend/routes/Redirect.js')(app, db);

  startApplication();
};

var startApplication = function() {
  app.listen(generalConfig.port);
  console.log('Applikation gestartet auf http://localhost:' + generalConfig.port);
};
