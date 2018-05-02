
var mongoose = require('mongoose');


var supplier = new mongoose.Schema({
    name:{type:String},
    contact:{type:String},
    address:{type:String},
    companyname:{type:String}

});
module.exports = mongoose.model('supplierdata', supplier);
