const mongoose = require("mongoose");
var Schema =  mongoose.Schema;
//database: travel
//collection:
//package of travel(_id,Title,Departure,destination,price,Description,traveltime,rate)
packageSchema = new Schema({
    _id:Object,
    Title:String,
    Departure:String,
    Destination:String,
    Price:Number,
    Description:String,
    Traveltime:String,
    Rate:Number
});
//user(_id,username,password,name,emailaddress,phonenumber,adress,billhistory)
userScheme = new Schema({
    _id:Object,
    Username:String,
    Password:String,
    FirstName:String,
    LastName:String,
    EmailAddress:String,
    PhoneNumber:String,
    Adress:String,
    BillHistory:String
});
//blog(_id,username,title,content,date,destination,rate)
blogScheme = new Schema({
    _id:Object,
    Username:String,
    Title:String,
    Content:String,
    Date:String,
    Destination:String,
    Rate:Number
});