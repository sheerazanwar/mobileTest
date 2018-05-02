
var mongoose = require('mongoose');


var customer = new mongoose.Schema({
    name :{type:String},
    cellno:{type:String},
    address:{type:String},
    email:{type:String},

});
module.exports = mongoose.model('customer', customer);
