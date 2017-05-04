'use strict';

angular.module('yogoApp')
  .controller('RegisterCtrl', function ($scope, $rootScope, $http, alert, authToken, API_URL, $state) {
    $scope.submit = function(){

      var url = API_URL+'register';
      var user = {
        email: $scope.email,
        password: $scope.password
      };

      $http.post(url, user)
        .then(function(res){
          alert('success', 'Account created!', 'Welcome, '+res.data.user.email+'!');
          authToken.setToken(res.data.token);
          $state.go('main');
        })
        .catch(function(err){
          alert('warning', 'Something went wrong :(', err.data.message);
        })
    };
  });
