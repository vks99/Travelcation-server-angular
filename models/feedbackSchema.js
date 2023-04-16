var mongoose = require ('mongoose'); 

var Schema = mongoose.Schema; 

feedbackSchema = new Schema ({
    name : String,
    email: String,
    feedback: String
});

module.exports = mongoose.model('feedback', feedbackSchema);
