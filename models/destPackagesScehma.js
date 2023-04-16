// Importing mongoose.
var mongoose = require('mongoose');

// Create Schema for the record.
var Schema = mongoose.Schema;

PackageSchema = new Schema({
    name : String,
    days : Number,
    no_persons : Number,
    price: Number,
    description: String
});
module.exports = mongoose.model('package', PackageSchema);