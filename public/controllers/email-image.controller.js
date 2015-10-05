module.exports = angular.module('emailImageProject')
  .controller('EmailImageController', function($scope, emailImageService) {
    $scope.imageResults = [];

    $scope.getImage = function() {
      if (!$scope.form.$valid) {
        return false;
      }

      emailImageService.getEmailImage($scope.email)
        .then(function(result) {
          var image = result.data.data;
          $scope.emailImage = image;
          $scope.imageResults.push({ image: image, searchStr: $scope.email });
        });
    };
  });
