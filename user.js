var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
  email: {type: String},
  username: {type: String, required: true},
  level: {type: Number},
  location: {type: String},
  member: {type: Boolean}
});

module.exports = mongoose.model("User", userSchema)
