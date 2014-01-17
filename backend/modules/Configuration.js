// code provided by AppFog.com, I did not write this
// this is neccessary since I host the application
// on appfog.com and need their environment variables

if (process.env.VCAP_SERVICES) {
  var env = JSON.parse(process.env.VCAP_SERVICES);
  var mongo = env['mongodb-1.8'][0]['credentials'];
} else {
  var mongo = {
    'hostname':    'localhost',
    'port':         27017,
    'username':     '',
    'password':     '',
    'name':         '',
    'db':           'urlshortener'
  }
}

var generate_mongo_url = function(obj) {
  obj.hostname = (obj.hostname || 'localhost');
  obj.port = (obj.port || 27017);
  obj.db = (obj.db || 'test');
  if (obj.username && obj.password) {
      return 'mongodb://' + obj.username + ':' + obj.password + '@' + obj.hostname + ':' + obj.port + '/' + obj.db;
  } else {
      return 'mongodb://' + obj.hostname + ':' + obj.port + '/' + obj.db;
  }
}

var mongourl = generate_mongo_url(mongo);

// end AppFog code



// export a config object
module.exports = {
  mongoDB: mongourl,
  port: process.env.VCAP_APP_PORT || 1122,
  staticDirectories: [
    '/public', 
    '/compiled-source',
    '../Dokumentation',
  ]
};
