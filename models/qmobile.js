
var mongoose = require('mongoose');


var Qmobile = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    Price:{type:String},
    brand:{type:String},
    imgurl:{type:String}
});
module.exports = mongoose.model('qmobile', Qmobile);
