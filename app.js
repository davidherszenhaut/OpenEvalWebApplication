// express set up

var express = require('express');
var app = express();
var router = express.Router();

var path = __dirname + '/views/';

// routing for views

app.use('/', router);

router.get('/', function(req, res) {
    res.sendFile(path + 'index.html');
});

router.get('/all-classes', function(req, res) {
    res.sendFile(path + 'all-classes.html');
});

router.get('/about', function(req, res) {
    res.sendFile(path + 'about.html');
});

app.use('*', function(req, res) {
    res.send('404 Not Found');
});

// logic from ./js/ files

var allClasses = require('./js/all-classes.js');
allClasses.getClasses('https://openeval-server.herokuapp.com/classes');

var parser = require('body-parser');
app.use(parser.urlencoded({ extended: true }));
app.post('/search', function(req, res) {
    console.log(req.body.courseName);
});

// start local server

app.listen(3000, function() {
    console.log('Live on port 3000');
});