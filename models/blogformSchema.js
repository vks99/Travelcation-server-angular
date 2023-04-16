// Importing mongoose.
var mongoose = require('mongoose');

// Create Schema for the record.
var Schema = mongoose.Schema;

BlogFormSchema = new Schema({
    title : String,
    author : String,
    content : String,
    date: {
        type: Date,
        default: Date.now
      },
});
module.exports = mongoose.model('blogform', BlogFormSchema);