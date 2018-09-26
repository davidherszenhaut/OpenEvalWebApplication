var https = require('https');

module.exports = {
    getDefaultQuestions: function(url) {
        https.get(url, function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                var res = JSON.parse(body);
                // console.log(res.message[0].questions);
                for (var i = 0; i < res.message[0].questions.length; i++) {
                    console.log(res.message[0].questions[i].question);
                }
            });
        }).on('error', function(err) {
            console.log(err);
        });
    }
}