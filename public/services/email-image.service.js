module.exports = angular.module('emailImageProject')
  .factory('emailImageService', function($http) {

    return {
      getEmailImage: getEmailImage
    };

    function getEmailImage(email) {
      var encodedEmail = encodeURIComponent(email);

      return $http({
        method: 'GET',
        url: '/profile-image/' + encodedEmail
      });
    }

  });
