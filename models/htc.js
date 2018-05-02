
var mongoose = require('mongoose');


var htcmobile = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    Price:{type:String},
    brand:{type:String},
    imgurl:{type:String}
});
module.exports = mongoose.model('htcmobile', htcmobile);


/*


           <li><a>Qmobile</a></li>
           <li><a>Huawei</a></li>
           <li><a>Nokia</a></li>
           <li><a>samsung</a></li>
           <li><a>Oppo</a></li>
           <li><a>HTC</a></li>

<div>
          <style>
   body{
         background-image:url('downloadjpg,jpg') no-repeated;
          background-size:cover;
          font-family:Arial;
          color:white;
      }
      ul
      {
          margin:0px;
          padding:0px;
          list-style: none;
      }

      ul
      li{

          float:left;
          width:200px;
          height:40px;
          background-color: black;
      } */
