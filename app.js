// express set up
var express = require('express');
var app = express();
var router = express.Router();

var path = __dirname + '/views/';
app.use(express.static('public'));

// routing for views
app.use('/', router);

var user;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/', function(req, res) {
    var user = {
        "username": req.body.username,
        "password": req.body.password,
        "usertype": req.body.usertype
    }
    console.log('post ', user);
    console.log('index ', user);
    var index = require('./public/js/index.js');
    if (user.usertype == "professor") {
        index.getRegisteredCourses('https://openeval-server.herokuapp.com/registeredCourses/' + user.username);
    } else if (user.usertype == "student") {
        index.getRegisteredCourses('https://openeval-server.herokuapp.com/studentRegCourses/' + user.username);
    }
    res.redirect('/');
});

// home page
router.get('/', function(req, res) {
    res.sendFile(path + 'index.html');
});
// list of all courses
router.get('/all-classes', function(req, res) {
    var allClasses = require('./public/js/all-classes.js');
    allClasses.getAllCourses('https://openeval-server.herokuapp.com/classes/');
    res.sendFile(path + 'all-classes.html');
});
// refined search page of courses
router.get('/search', function(req, res) {
    res.sendFile(path + 'search.html');
});
// about the application
router.get('/about', function(req, res) {
    res.sendFile(path + 'about.html');
});
// login page
router.get('/login', function(req, res) {
    res.sendFile(path + 'login.html');
});
// active surveys page
router.get('/active-surveys', function(req, res) {
    var activeSurveys = require('./public/js/active-surveys.js');
    activeSurveys.getActiveSurveys('https://openeval-server.herokuapp.com/surveys/' + user.username + '/' + 'CS 1332');
    res.sendFile(path + 'active-surveys.html');
});
// results of an active survey
router.get('/view-survey', function(req, res) {
    var viewSurvey = require('./public/js/view-survey.js');
    viewSurvey.getSurveyResults('https://openeval-server.herokuapp.com/responses/default/' + '5bff571503a4fc00045bd9b3');
    res.sendFile(path + 'view-survey.html');
});
// complete an active survey
router.get('/complete-survey', function(req, res) {
    var complete = require('./public/js/complete-survey.js');
    complete.getSurveyQuestions('https://openeval-server.herokuapp.com/questions/default');
    res.sendFile(path + 'complete-survey.html');
});
// 404 page
app.use('*', function(req, res) {
    res.send('404 Not Found');
});

// professor
// login -> registered courses
// registered courses -> current surveys of that course
// current surveys of that course -> view active survey
// current surveys of that course -> create new survey

// student
// login -> registered courses
// registered courses -> current surveys of that course
// current surveys of that course -> specific survey of that course

// login
// logout

// var login = require('./public/js/login.js');
// var user = login.importData();
// loading in data
// var allClasses = require('./public/js/all-classes.js');
// allClasses.getAllCourses('https://openeval-server.herokuapp.com/classes/');
// var index = require('./public/js/index.js');
// index.getRegisteredCourses('https://openeval-server.herokuapp.com/registeredCourses/' + user.username);
// index.getRegisteredCourses('https://openeval-server.herokuapp.com/studentRegCourses/cperez3');
// var surveys = require('./public/js/surveys.js');
// surveys.getActiveSurveys('https://openeval-server.herokuapp.com/surveys/abray3');

// start local server
app.listen(3000, function() {
    console.log('Live on port 3000');
});