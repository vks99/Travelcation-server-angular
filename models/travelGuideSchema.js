// Importing mongoose.
var mongoose = require('mongoose');

// Create Schema for the record.
var Schema = mongoose.Schema;

TravelGuideSchema = new Schema({
    name : String,
});
module.exports = mongoose.model('TravelGuides', TravelGuideSchema);