module.exports = angular.module('emailImageProject', [
    require('angular-route')
  ])
  .config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
      $routeProvider
        .when('/contacts', {
          templateUrl: 'templates/contacts.html',
          controller: 'ContactsController'
        })
        .otherwise({
          redirectTo: '/contacts'
        });
      }
  ]);

require('./controllers/contacts.controller');

require('./templates/contacts.html');
