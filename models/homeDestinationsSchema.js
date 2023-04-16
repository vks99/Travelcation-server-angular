// Importing mongoose.
var mongoose = require('mongoose');

// Create Schema for the record.
var Schema = mongoose.Schema;

HomeDestSchema = new Schema({
    name : String,
    description: String
});
module.exports = mongoose.model('homeDestinations', HomeDestSchema);