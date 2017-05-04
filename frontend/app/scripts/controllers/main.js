'use strict';

/**
 * @ngdoc function
 * @name yogoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yogoApp
 */
angular.module('yogoApp')
  .controller('MainCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
