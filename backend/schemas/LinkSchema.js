module.exports = function(mongoose) {

  // mongoose link schema object
  // this is used to parse and access the MongoDB.
  // thanks to this schema we need zero configuration database wise.
  var linkSchema = new mongoose.Schema({
    url: String,
    shortUrl: String,
    added: Date,
    clicks: Number,
    owner: mongoose.Schema.Types.ObjectId
  },
  { 
    collection: 'links' 
  });

  return mongoose.model('Link', linkSchema);
  
}