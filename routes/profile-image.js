var Promise = require('bluebird');
var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var NodeCache = require('node-cache');
var myCache = new NodeCache();
Promise.promisifyAll(myCache);

// TODO: Potentially split logic into separate file for testability?
// maybe do unit tests and e2e tests?
// TODO: Ping gravatar first, then fall back to google image search
// TODO: Validate email
// TODO: Create API to flush cache and get keys/stats

/* GET images from Google based on email. */
router.get('/:email', function(req, res) {
  var encodedEmail = req.params.email;
  var googleAPIKey = process.env.GOOGLE_API_KEY;
  var cxCode = process.env.GOOGLE_CX_CODE;

  myCache.getAsync('email_' + encodedEmail)
    .then(function(result) {
      if (result) {
        return result;
      } else {
        return rp('https://www.googleapis.com/customsearch/v1?key=' + googleAPIKey + '&cx=' + cxCode + '&q=' + encodedEmail + '&searchType=image')
          .then(function(result) {
            myCache.setAsync('email_' + encodedEmail, result);
            return result;
          });
      }
    })
    .then(function(result) {
      var data = JSON.parse(result);

      // TODO: Send an array to choose from?
      res.send(data.items[0].link);
    });
});

module.exports = router;

