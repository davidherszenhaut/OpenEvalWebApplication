var https = require('https');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document } = (new JSDOM('<!doctype html><html><body><div id="class-list"></div></body></html>')).window;

function getClasses(url) {
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
                var node = document.createElement("p");
                var text = document.createTextNode(courses[i].courseNumber + ": " + courses[i].courseName);
                node.appendChild(text);
                document.getElementById("class-list").appendChild(node);
            }
        });
    }).on('error', function(err) {
        console.log(err);
    });
}

getClasses('https://openeval-server.herokuapp.com/classes');

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
                    const $ = cheerio.load("<p>Course Number: " + courses[i].courseNumber + ", Course Name: " + courses[i].courseName + "</p>");
                    $("<p>Course Number: " + courses[i].courseNumber + ", Course Name: " + courses[i].courseName + "</p>").appendTo('#class-list');
                    $.html();
                }
            });
        }).on('error', function(err) {
            console.log(err);
        });
    }
};