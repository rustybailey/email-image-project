var Bluebird = require('bluebird');
var NodeCache = require('node-cache');
var cache = new NodeCache();
Bluebird.promisifyAll(cache);

function ProfileImageBusiness(dataHandler) {
  this.dataHandler = dataHandler;
}

ProfileImageBusiness.prototype.getEmailImage = function(email) {
  var cacheKey = 'email_' + email;
  var data, totalResults, link;

  return cache.getAsync(cacheKey)
    .then(result => {
      if (result) {
        return result;
      } else {
        return this.dataHandler.googleImageQuery(email)
          .then(function(result) {
            cache.setAsync(cacheKey, result);
            return result;
          });
      }
    })
    .then(result => {
      data = JSON.parse(result);
      totalResults = parseInt(data.searchInformation.totalResults);

      if (!totalResults) {
        return null;
      }

      link = data.items[0].link;
      // Fallback to thumbnail if link contains 'x-raw-image'
      if (link.indexOf('x-raw-image') > -1) {
        link = data.items[0].image.thumbnailLink;
      }

      return link;
    });
};

module.exports = ProfileImageBusiness;
