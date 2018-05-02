const exprss = require('express');
const htc = require('../models/htc.js');
var app = exprss();
const multer = require('multer');
const uploads = multer({dest: './uploads'});


exports.openhtc =function(req,res){
    res.render("htc");
}

exports.viewhtc =function(req,res){

    htc.find({}).exec(function(err,result){
        if(err){
            res.status(500).send({error:err});
        }
        else{
            res.render("viewhtc",{htc:result});
        }
    });
}
// const multer = require('multer');
// const uploads = multer({dest: './uploads'});
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads')
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + file.originalname)
    }
  })

//   exports.add= function(req, res){
//     let newHtc = new htc({
//         title: req.body.title,
//         description: req.body.description,
//         Price: req.body.Price,
//         brand: req.body.brand
        
//     });

//     newHtc.save((err, htc)=>{
//         if(err){
//             res.json({msg: 'Failed to add the notifications'});
//         }
//         else{
//             res.json({msg: 'notifications is added successfully'});
//         }
//     });
// }

 exports.add = function(req,res){
    var upload = multer({ storage: storage }).single('userFile')
    upload(req, res, function (err) {
        console.log("file Name",req.file)
        console.log("Request: ",req.body);
        console.log(req.body);
        var params = req.body;

        let newHtc = new htc({
        title: req.body.title,
        description: req.body.description,
        Price: req.body.Price,
        brand: req.body.brand,
        imgurl:req.file.path
        
    });

    newHtc.save((err, htc)=>{
        if(err){
            res.json({msg: 'Failed to add the notifications'});
        }
        else{
         //   res.json({msg: 'notifications is added successfully'});
         res.render("htc",htc);
        }
    });
    
    })
}



// exports.add = function(req,res){
//     var upload = multer({ storage: storage }).single('userFile')
//     upload(req, res, function (err) {
//         console.log("file Name",req.file)
//         console.log("Request: ",req.body);
//         console.log(req.body);
//         var params = req.body;
//        if(params.title==undefined ){
//          res.status(404).send({
//            message:'one or more perameters missing'
//          });
//        }else{
//         new htc({
//             title:params.title,
//             description:params.description,
//             Price:params.Price,
//             imageurl:req.file.path,
//             brand:params.brand
//         }).save(function(error,result){
//           if(error){
//                res.json({msg: 'Failed to add the Events'});
//             // console.log(error);
//       }else{
//           //  res.json({msg: 'Event is added in database'});
//           console.log("data is insert")
//             // res.render("events");
//           //    console.log(result);
//           }
//         });
//         res.end();
//       }
//     })
// }



// exports.addhtc= function(req, res){
//     let newhtc = new htc({

//         title: req.body.field1,
//         description: req.body.field2,
//         Price: req.body.field3,
//         brand: req.body.field4,
//         imgurl: req.body.field5
       
//     });
//     newhtc.save((err, htc)=>{
//         if(err){
//             res.json({msg: 'Failed to add the User'});
//         }
//         else{
       
//             res.render("register");
      
         
            
//         }
//     });
// }



exports.getAll = function (req, res) {
    htc
        .find({})
        .exec(function (error, htc) {
            if (error) {
                res
                    .status(500)
                    .send({message: error});
            } else {
                res
                    .status(200)
                    .send(htc);
            }
        })
}


 exports.delete = function(req, res, next){
    htc.remove({_id: req.params.id},function(err, result){
         if(err){
            res.json(err);
       }
       else{
        htc.find({}).then(function(result){
            res.render("viewhtc",{htc:result});
        })
        // res.json(result);
    }
    });
 }
 
