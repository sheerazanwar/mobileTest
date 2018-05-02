const exprss = require('express');
const huawei = require('../models/huawei.js');
var app = exprss();
const multer = require('multer');
const uploads = multer({dest: './uploads'});


exports.openhuawei = function(req,res){
    res.render("huawei");
    
    }
    
    exports.viewhuawei = function(req,res){
    
        huawei.find({}).exec(function(err,result){
            if(err){
                res.status(500).send({error:err});
            }
            else{
                res.render("viewhuawei",{huawei:result});
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

        let newHuawei = new huawei({
        title: req.body.title,
        description: req.body.description,
        Price: req.body.Price,
        brand: req.body.brand,
        imgurl:req.file.path
        
    });

    newHuawei.save((err, huawei)=>{
        if(err){
            res.json({msg: 'Failed to add the notifications'});
        }
        else{
          //  res.json({msg: 'notifications is added successfully'});
          res.render("huawei",huawei);
        }
    });
    
    })
}


// exports.addhuawei= function(req, res){
//     let newhuawei = new huawei({

//         title: req.body.field1,
//         description: req.body.field2,
//         Price: req.body.field3,
//         brand: req.body.field4,
//         imgurl: req.body.field5
       
//     });
//     newhuawei.save((err, htc)=>{
//         if(err){
//             res.json({msg: 'Failed to add the User'});
//         }
//         else{
       
//             res.render("register");
      
         
            
//         }
//     });
// }



exports.getAll = function (req, res) {
    huawei
        .find({})
        .exec(function (error, huawei) {
            if (error) {
                res
                    .status(500)
                    .send({message: error});
            } else {
                res
                    .status(200)
                    .send(huawei);
            }
        })
}


 exports.delete = function(req, res, next){
    huawei.remove({_id: req.params.id},function(err, result){
         if(err){
            res.json(err);
       }
       else{
        nokia.find({}).then(function(result){
            res.render("viewhuawei",{huawei:result});
        })
        // res.json(result);
    }
    });
 }
 
