module.exports = function(mongoose) {

  var userSchema = new mongoose.Schema({
    email: String,
    password: String,
  },
  { 
    collection: 'user' 
  });

  return mongoose.model('User', userSchema);
  
}