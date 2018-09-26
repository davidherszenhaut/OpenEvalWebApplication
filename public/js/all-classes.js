var https = require('https');
var fs = require('fs');
// const jsdom = require('jsdom');
// const JSDOM = jsdom;

module.exports = {
    // listens to user input for live search functionality
    inputListener: function(searchString) {
        console.log('testing');
        app.post('/courseSearch', function(req, res) {
            console.log(req.body.course);
        });
    },
    // old function for getting classes, writes text to file, not proper HTML
    getClasses: function(url) {
        https.get(url, function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                var res = JSON.parse(body);
                classList = '';
                courses = res.message;
                for (var i = 0; i < courses.length - 1; i++) {
                    classList += '<li>' + courses[i].courseNumber + ':' + courses[i].courseName + '</li>\n';
                }
                fs.appendFile('./views/all-classes.html', classList, function(err) {
                    if (err) throw err;
                });
            });
        }).on('error', function(err) {
            console.log(err);
        });
    },
    // new function for getting classes, look into cheerio and jsdom
    getClassesJSDOM: function(url) {
        https.get(url, function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                var res = JSON.parse(body);
                classList = '';
                courses = res.message;
                for (var i = 0; i < courses.length - 1; i++) {
                    console.log("Course Number: " + courses[i].courseNumber + ", Course Name: " + courses[i].courseName);
                }
            });
        }).on('error', function(err) {
            console.log(err);
        });
    }
};