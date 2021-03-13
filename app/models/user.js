var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    firstName: String,
    lastName : String,
    email: String,
    phoneNumber : String,
    profileImage : String
});

module.exports = mongoose.model('User', UserSchema);