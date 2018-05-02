var express = require("express");

var router = express.Router();
var app = express();

var htc = require('../api/htc.js');
router.post('/htc/add', htc.add);
// router.post('/login', user.login);
 router.get('/htc', htc.getAll);
 router.get('/htc/delete/:id', htc.delete);



var oppo = require('../api/oppo.js');
router.post('/oppo/add', oppo.add);
router.get('/oppo', oppo.getAll);
router.get('/oppo/delete/:id', oppo.delete);


 var nokia = require('../api/nokia.js');
 router.post('/nokia/add', nokia.add);
 router.get('/nokia', nokia.getAll);
 router.get('/nokia/delete/:id', nokia.delete);

 var samsung = require('../api/samsung.js');
 router.post('/samsung/add', samsung.add);
 router.get('/samsung', samsung.getAll);
 router.get('/samsung/delete/:id', samsung.delete);


  var qmobile = require('../api/qmobile.js');
  router.post('/qmobile/add', qmobile.add);
  router.get('/qmobile', qmobile.getAll);
  router.get('/qmobile/delete/:id', qmobile.delete);

    var huawei = require('../api/huawei.js');
    router.post('/huawei/add', huawei.add);
    router.get('/huawei', huawei.getAll);
    router.get('/huawei/delete/:id', huawei.delete);

    var customer = require('../api/customer.js');
    router.post('/customer/add',customer.add);
    router.get('/customer',customer.getAll);

    router.use('/uploads', express.static('uploads'));
  module.exports = router;




