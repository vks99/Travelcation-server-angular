var mongoose = require ('mongoose'); 

var Schema = mongoose.Schema; 

userSchema = new Schema ({
	name : String,
	phone : String,
	email : String,
	password:String,
	address:String,
	token: { type: String }
});

module.exports = mongoose.model('user', userSchema);