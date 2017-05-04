'use strict';

angular.module('yogoApp')
  .controller('HeaderCtrl', function ($scope, authToken, $location) {
    $scope.isAuthenticated = authToken.isAuthenticated;
   $scope.showPageHero = $location.path() === '/player';
  });
