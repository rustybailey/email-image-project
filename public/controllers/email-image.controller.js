module.exports = angular.module('emailImageProject')
  .controller('EmailImageController', function($scope, emailImageService) {
    $scope.getImage = function() {
      if (!$scope.form.$valid) {
        return false;
      }

      emailImageService.getEmailImage($scope.email)
        .then(function(result) {
          $scope.emailImage = result.data.data;
        });
    };
  });
