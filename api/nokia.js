const exprss = require('express');
const nokia = require('../models/nokia.js');
var app = exprss();
const multer = require('multer');
const uploads = multer({dest: './uploads'});

exports.opennokia = function(req,res){
res.render("nokia");

}

exports.viewnokia = function(req,res){

    nokia.find({}).exec(function(err,result){
        if(err){
            res.status(500).send({error:err});
        }
        else{
            res.render("viewnokia",{nokia:result});
        }
    });
}

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads')
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + file.originalname)
    }
  })



  exports.add = function(req,res){
    var upload = multer({ storage: storage }).single('userFile')
    upload(req, res, function (err) {
        console.log("file Name",req.file)
        console.log("Request: ",req.body);
        console.log(req.body);
        var params = req.body;

        let newNokia = new nokia({
        title: req.body.title,
        description: req.body.description,
        Price: req.body.Price,
        brand: req.body.brand,
        mgurl:req.file.path
        
    });

      newNokia.save((err, nokia)=>{
        if(err){
           console.log(err);
        }
        else{
            // res.json({msg: 'notifications is added successfully'});
            res.render("nokia",nokia);
        }
    });
    
       
})
}




//  exports.add = function(req,res){
//     var upload = multer({ storage: storage }).single('userFile')
//     upload(req, res, function (err) {
//         console.log("file Name",req.file)
//         console.log("Request: ",req.body);
//         console.log(req.body);
//         var params = req.body;

//         let newnokia = new nokia({
//         title: req.body.title,
//         description: req.body.description,
//         Price: req.body.Price,
//         brand: req.body.brand,
//         imgurl:req.file.path
        
//     });

//     newnokia.save((err, nokia)=>{
//         if(err){
//             res.json({msg: 'Failed to add the notifications'});
          
//         }
//         else{
//            // res.json({msg: 'notifications is added successfully'});
//            res.render("nokia",nokia);
//         }
//     });
//        })
// }

exports.getAll = function (req, res) {
    nokia
        .find({})
        .exec(function (error, nokia) {
            if (error) {
                res
                    .status(500)
                    .send({message: error});
            } else {
                res
                    .status(200)
                    .send(nokia);
            }
        })
}


 exports.delete = function(req, res, next){
    nokia.remove({_id: req.params.id},function(err, result){
         if(err){
            res.json(err);
       }
       else{
        nokia.find({}).then(function(result){
            res.render("viewnokia",{nokia:result});
        })
        // res.json(result);
    }
    });
 }
 
