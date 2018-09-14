var https = require('https');
var fs = require('fs');
// var jsdom = require('jsdom');

module.exports = {
    inputListener: function(searchString) {
        console.log('testing');
        app.post('/courseSearch', function(req, res) {
            console.log(req.body.course);
        });
    },
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
    }
};