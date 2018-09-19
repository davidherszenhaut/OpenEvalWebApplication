// express set up

var express = require('express');
var app = express();
var router = express.Router();

var path = __dirname + '/views/';
app.use(express.static('public'));

// routing for views

app.use('/', router);

router.get('/', function(req, res) {
    res.sendFile(path + 'index.html');
});

router.get('/all-classes', function(req, res) {
    res.sendFile(path + 'all-classes.html');
});

router.get('/search', function(req, res) {
    res.sendFile(path + 'search.html');
});

router.get('/about', function(req, res) {
    res.sendFile(path + 'about.html');
});

router.get('/login', function(req, res) {
    res.sendFile(path + 'login.html');
});

app.use('*', function(req, res) {
    res.send('404 Not Found');
});

// logic from ./public/js/ files

var allClasses = require('./public/js/all-classes.js');
// allClasses.getClasses('https://openeval-server.herokuapp.com/classes');
allClasses.getClassesJSDOM('https://openeval-server.herokuapp.com/classes');

var parser = require('body-parser');
app.use(parser.urlencoded({ extended: true }));
app.post('/search', function(req, res) {
    console.log(req.body.courseName);
});

// start local server

app.listen(3000, function() {
    console.log('Live on port 3000');
});