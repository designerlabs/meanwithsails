'use strict';


angular.module('yogoApp')

  // .controller('LoginCtrl', function($scope, alert, auth){
  //   $scope.submit = function(){
  //     auth.login($scope.email, $scope.password)
  //     .then(function(res){
  //       alert('success', 'Welcome', 'Thanks for coming back '+res.user.email+'!');
  //     })
  //      .catch(function(err){
  //         alert('warning', 'Something went wrong :(', err.message);
  //       })
  //   };
  //   $scope.google = function(){

  //   };
  // });
  .controller('LoginCtrl', function ($scope, $http, alert, authToken, API_URL, $state, auth) {
        $scope.submit = function(){

          var url = API_URL+'login';
          var user = {
            email: $scope.email,
            password: $scope.password
          };

          $http.post(url, user)
            .then(function(res){
              alert('success', 'Welcome', 'Thanks for coming back '+res.data.user.email+'!');
              authToken.setToken(res.data.token);
              $state.go('main');
            })
            .catch(function(err){
              alert('warning', 'Something went wrong :(', err.data.message);
            })
    };

    $scope.google = function(){
      auth.googleAuth().then(function(res){
         alert('success', 'Welcome', 'Thanks for coming back '+res.data.user.displayName+'!');
      },function(err){
          alert('warning', 'Something went wrong :(', err.data.message);
        });
    }
  });
