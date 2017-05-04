'use strict';

/**
 * @ngdoc function
 * @name yogoApp.controller:AddcampaignCtrl
 * @description
 * # AddcampaignCtrl
 * Controller of the yogoApp
 */
angular.module('yogoApp')
  .controller('CampaignformCtrl', function ($scope, $rootScope, $http, alert, authToken, API_URL, $state) {
    $scope.submit = function(){

      var url = 'http://localhost:1337/player/create';
      var user = {
        user_id: 'email',
        cmgn_name: $scope.campaignName,
        cmgn_desc: $scope.campaignDesc,
        cmgn_layout:$scope.campaignLayout,
        cmgn_pair_with: 'ABCEDE',
        cmgn_data:'{data:data}'
      };
      $http.post(url, user)
        .then(function(res){
          console.log('success');
          alert('success', 'Account created!', 'Welcome, '+res+'!');
          $state.go('campaign');
        })
        .catch(function(err){
          alert('warning', 'Something went wrong :(', err);
          console.log(err);
        })
    };
  });

  
