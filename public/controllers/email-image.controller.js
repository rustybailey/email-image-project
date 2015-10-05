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

          if (image) {
            $scope.imageResults.unshift({ image: image, searchStr: $scope.email });
          }
        });
    };

    $scope.setImage = function(name, image) {
      $scope.email = name;
      $scope.emailImage = image;
    };
  });
