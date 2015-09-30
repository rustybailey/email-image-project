var Promise = require('bluebird');
var NodeCache = require('node-cache');
var cache = new NodeCache();
Promise.promisifyAll(cache);

function ProfileImageBusiness(dataHandler) {
  this.dataHandler = dataHandler;
}

ProfileImageBusiness.prototype.getEmailImage = function(email) {
  var that = this;
  var cacheKey = 'email_' + email;

  return cache.getAsync(cacheKey)
    .then(function(result) {
      if (result) {
        return result;
      } else {
        return that.dataHandler.googleImageQuery(email)
          .then(function(result) {
            cache.setAsync(cacheKey, result);
            return result;
          });
      }
    })
    .then(function(result) {
      var data = JSON.parse(result);
      var totalResults = parseInt(data.searchInformation.totalResults);
      var link;

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
