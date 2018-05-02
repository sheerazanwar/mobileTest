const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var ejs = require('ejs');
const morgan = require('morgan');
const multer = require('multer');
const uploads = multer({dest: './uploads'});


var port = process.env.PORT || 8080;

// const passport = require('passport');
var path = require('path');
// const config = require('./config/main.js');
// const User = require('./models/user.js');
const cookieParser = require('cookie-parser');


var routes = require('./routes/index.js');
var route = require('./routes/routes.js');

var app = express();




// configure middlewear ==============================================================================
// logger
app.use(morgan('dev'));
// json manipulation on server side
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


mongoose.connect('mongodb://admin:admin@ds155587.mlab.com:55587/mobileshop');

mongoose.Promise = global.Promise;

mongoose.connection.on('connected',function(){

    console.log('Connected to database  mongodb');
});

mongoose.connection.on('error',function(err){
    if(err){
        console.log('Error on database connection to mongodb' +err);
    }
});

app.use('/api',route);


// app.use('/api',route);
// app.use('/api',route);
app.set('view engine', 'ejs');
   routes(app);
app.use(express.static(path.join(__dirname, 'layout')));
app.use(express.static('public'));
app.use('/public',express.static('public'));
app.use('/uploads', express.static('uploads'));
app.get('*', (req, res) => res.status(404).send({error:'page not found'}));

app.listen(port, () => console.log('Server is live on port : ', port));
