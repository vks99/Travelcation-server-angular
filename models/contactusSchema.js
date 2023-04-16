// Importing mongoose.
var mongoose = require('mongoose');

// Create Schema for the record.
var Schema = mongoose.Schema;

ContactUsSchema = new Schema({
    fullName : String,
    email : String,
    subject : String,
    message:String
});
module.exports = mongoose.model('contactus', ContactUsSchema);