module.exports = angular.module('emailImageProject')
  .controller('EmailImageController', function($scope, emailImageService) {
    $scope.getImage = function() {
      emailImageService.getEmailImage($scope.email)
        .then(function(result) {
          $scope.emailImage = result.data.data;
        });
    };
  });
