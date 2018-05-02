const exprss = require('express');
const samsung = require('../models/samsung.js');
var app = exprss();
const multer = require('multer');
const uploads = multer({dest: './uploads'});


exports.opensamsung = function(req, res){
    res.render("samsung");
}

exports.viewsamsung = function(req,res){
    samsung.find({}).exec(function(err,result){
        if(err){
            res.status(500).send({error:err});
        }
        else{
            res.render("viewsamsung",{samsung:result});
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

        let newsamsung = new samsung({
        title: req.body.title,
        description: req.body.description,
        Price: req.body.Price,
        brand: req.body.brand,
        imgurl:req.file.path
        
    });

    newsamsung.save((err, samsung)=>{
        if(err){
            res.json({msg: 'Failed to add the notifications'});
        }
        else{
            // res.json({msg: 'notifications is added successfully'});
            res.render("samsung",samsung);
        }
    });
    
    })
}



exports.getAll = function (req, res) {
    samsung
        .find({})
        .exec(function (error, samsung) {
            if (error) {
                res
                    .status(500)
                    .send({message: error});
            } else {
                res
                    .status(200)
                    .send(samsung);
            }
        })
}


 exports.delete = function(req, res, next){
    samsung.remove({_id: req.params.id},function(err, result){
         if(err){
            res.json(err);
       }
       else{
        samsung.find({}).then(function(result){
            res.render("viewsamsung",{samsung:result});
        })
        // res.json(result);
    }
    });
 }
 
