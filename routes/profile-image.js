var express = require('express');
var router = express.Router();
var rp = require('request-promise');

// TODO: Potentially split logic into separate file for testability?
// maybe do unit tests and e2e tests?
// TODO: Ping gravatar first, then fall back to google image search

/* GET users listing. */
router.get('/:email', function(req, res) {
  var encodedEmail = req.params.email;
  // TODO: Put these two items in a config somewhere
  var googleAPIKey = 'AIzaSyC1G5tI8em5WkSk6RyVwqV5zGLv7e1-hfc';
  var cxCode = '010249180093990001910:krzjvvbgvne';

  rp('https://www.googleapis.com/customsearch/v1?key=' + googleAPIKey + '&cx=' + cxCode + '&q=' + encodedEmail + '&searchType=image')
    .then(function(result) {
      var data = JSON.parse(result);

      // TODO: Send an array to choose from?
      res.send(data.items[0].link);
    });
});

module.exports = router;
