var mongoose = require('mongoose');
var contactus = require('./models/contactusSchema');

async function addContactusData(data){
    await contactus.create(data);
    return true
}

