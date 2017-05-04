'use strict';

angular.module('yogoApp')
  .factory('sharedService', function ($rootScope) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
