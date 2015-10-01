module.exports = angular.module('emailImageProject', [
    require('angular-route')
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/email-image', {
        templateUrl: 'templates/email-image.html',
        controller: 'EmailImageController'
      })
      .otherwise({
        redirectTo: '/email-image'
      });
  });

require('./services/email-image.service');

require('./controllers/email-image.controller');

require('./templates/email-image.html');
