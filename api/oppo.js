const exprss = require('express');
const oppo = require('../models/oppo.js');
var app = exprss();
const multer = require('multer');
const uploads = multer({dest: './uploads'});

exports.openOppo = function(req, res){
    res.render("oppo");
}

exports.viewOppo = function(req,res){
    oppo.find({}).exec(function(err,result){
        if(err){
            res.status(500).send({error:err});
        }
        else{
            res.render("viewoppo",{oppo:result});
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

// exports.addoppo= function(req, res){
//     let newoppo = new oppo({

//         title: req.body.field1,
//         description: req.body.field2,
//         Price: req.body.field3,
//         brand: req.body.field4,
//         imgurl: req.body.field5
       
//     });
//     newoppo.save((err, oppo)=>{
//         if(err){
//             res.json({msg: 'Failed to add the User'});
//         }
//         else{
       
//             res.render("register");
      
         
            
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

        let newoppomobile = new oppo({
        title: req.body.title,
        description: req.body.description,
        Price: req.body.Price,
        brand: req.body.brand,
        mgurl:req.file.path
        
    });

      newoppomobile.save((err, oppo)=>{
        if(err){
           console.log(err);
        }
        else{
            // res.json({msg: 'notifications is added successfully'});
            res.render("oppo",oppo);
        }
    });


       
    })
}




exports.getAll = function (req, res) {
    oppo
        .find({})
        .exec(function (error, oppo) {
            if (error) {
                res
                    .status(500)
                    .send({message: error});
            } else {
                res
                    .status(200)
                    .send(oppo);
            }
        })
}


// exports.delete = function(req, res, next){
//     oppo.remove({_id: req.params.id},function(err, result){
//         if(err){
//             console.log("error in db")
//             res.json(err);
//         }
//         else{
//             oppo.find({}).then(function(result){
//                 res.render("viewoppo",{oppo:result});
//             })
//             // res.json(result);
//         }
//     });
// }
 

// exports.delete = function(req, res, next){
//     oppo.remove({_id: req.params.id},function(err, result){
//          if(err){
//             res.json(err);
//        }
//        else{
//            console.log("deleted successfully");
//            res.render("viewoppo",{oppo:result});
//         //    res.json(result);
//         }
//     });
//  }



 exports.delete = function(req, res, next){
    oppo.remove({_id: req.params.id},function(err, result){
        if(err){
            res.json(err);
        }
        else{
            oppo.find({}).then(function(result){
                res.render("viewoppo",{oppo:result});
            })
            // res.json(result);
        }
    });
}

