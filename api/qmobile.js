const exprss = require('express');
const qmobile = require('../models/qmobile.js');
var app = exprss();
const multer = require('multer');
const uploads = multer({dest: './uploads'});



exports.openqmobile = function(req, res){
    res.render("qmobile");
}

exports.viewqmobile = function(req,res){
    qmobile.find({}).exec(function(err,result){
        if(err){
            res.status(500).send({error:err});
        }
        else{
            res.render("viewqmobile",{qmobile:result});
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


 exports.add = function(req,res){
    var upload = multer({ storage: storage }).single('userFile')
    upload(req, res, function (err) {
        console.log("file Name",req.file)
        console.log("Request: ",req.body);
        console.log(req.body);
        var params = req.body;

        let newQmobile = new qmobile({
        title: req.body.title,
        description: req.body.description,
        Price: req.body.Price,
        brand: req.body.brand,
        imgurl:req.file.path
        
    });

    newQmobile.save((err, qmobile)=>{
        if(err){
            res.json({msg: 'Failed to add the notifications'});
        }
        else{
          //  res.json({msg: 'notifications is added successfully'});
          res.render("qmobile",qmobile);
        }
    });
    
    })
}



exports.getAll = function (req, res) {
    qmobile
        .find({})
        .exec(function (error, qmobile) {
            if (error) {
                res
                    .status(500)
                    .send({message: error});
            } else {
                res
                    .status(200)
                    .send(qmobile);
            }
        })
}


 exports.delete = function(req, res, next){
    qmobile.remove({_id: req.params.id},function(err, result){
         if(err){
            res.json(err);
       }
       else{
        qmobile.find({}).then(function(result){
            res.render("viewoppo",{oppo:result});
        })
        // res.json(result);
    }
    });
 }
 
