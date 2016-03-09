var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var birdSchema = require('./bird')

var sightingsSchema = new Schema ({
  user: {type: String, ref: "User"}, //don't need to require the user collection because of ref
  birds: [birdSchema],
  confirmed: {type: Boolean, default: false},
  numberSeen: {type: Number, min: 1}
});

module.exports = mongoose.model("sightings", sightingsSchema);
