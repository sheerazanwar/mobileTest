var express = require('express');
var app = express();
app.use(express.static('uploads'));
var oppo = require('../api/oppo.js');
var htc = require('../api/htc.js');
var nokia = require('../api/nokia.js');
var samsung = require('../api/samsung.js');
var qmobile = require('../api/qmobile.js');
var huawei = require('../api/huawei.js');

module.exports = function(app){
    app.get('/', function(req,res){
        res.render('index');
    });

  app.get('/page/htc',htc.openhtc);
  app.get('/page/viewhtc',htc.viewhtc);

    app.get('/page/oppo',oppo.openOppo);
    app.get('/page/viewoppo',oppo.viewOppo);


    app.get('/page/nokia',nokia.opennokia);
    app.get('/page/viewnokia',nokia.viewnokia);



      
        app.get('/page/samsung',samsung.opensamsung);
        app.get('/page/viewsamsung',samsung.viewsamsung);

        app.get('/page/qmobile',qmobile.openqmobile);
        app.get('/page/viewqmobile',qmobile.viewqmobile);

    

        app.get('/page/huawei',huawei.openhuawei);
        app.get('/page/viewhuawei',huawei.viewhuawei);

        app.use('/uploads', express.static('uploads'));


};






