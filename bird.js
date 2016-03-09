var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = Schema ({
  name: {type: String, lowercase: true},
  order: {type: String, lowercase: true, maxlength: 20},
  status : {
    type: String,
    lowercase: true,
    enum: [
      "extinct",
      "near threatened",
      "lease concern"
    ]
  }
});
