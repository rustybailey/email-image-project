var Promise = require('bluebird');
var NodeCache = require('node-cache');
var myCache = new NodeCache();
Promise.promisifyAll(myCache);

function ProfileImageBusiness(dataHandler) {
  this.dataHandler = dataHandler;
}

ProfileImageBusiness.prototype.getEmailImage = function(email) {
  var that = this;
  var cacheKey = 'email_' + email;

  return myCache.getAsync(cacheKey)
    .then(function(result) {
      if (result) {
        return result;
      } else {
        return that.dataHandler.googleImageQuery(email)
          .then(function(result) {
            myCache.setAsync(cacheKey, result);
            return result;
          });
      }
    })
    .then(function(result) {
      var data = JSON.parse(result);

      // TODO: Account for data or items being empty
      return data.items[0].link;
    });


};

module.exports = ProfileImageBusiness;