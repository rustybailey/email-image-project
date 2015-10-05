var Bluebird = require('bluebird');
var NodeCache = require('node-cache');
var cache = new NodeCache({
  stdTTL: 60 * 30 // 30 minutes
});
Bluebird.promisifyAll(cache);
var parseResults = require('../helpers/utils');

function ProfileImageBusiness(dataHandler) {
  this.dataHandler = dataHandler;
}

ProfileImageBusiness.prototype.getEmailImage = function(email) {
  var cacheKey = 'email_' + email;

  return cache.getAsync(cacheKey)
    .then(result => {
      if (result) {
        return result;
      } else {
        return this.dataHandler.googleImageQuery(email)
          .then(parseResults);
      }
    })
    .then(result => {
      var cacheData = result || 'no data';
      cache.setAsync(cacheKey, cacheData);

      return result === 'no data' ? null : result;
    });
};

module.exports = ProfileImageBusiness;
