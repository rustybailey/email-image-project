/*jshint browser:true */
'use strict';
// load in scss/js vendor files
/* Styles */
require('../scss/index.scss');
/* JS */
var angular = require('angular');

// load the main app file
var appModule = require('../index');
// replaces ng-app="appName"
angular.element(document).ready(function() {
  angular.bootstrap(document, [appModule.name], {
    //strictDi: true
  });
});
