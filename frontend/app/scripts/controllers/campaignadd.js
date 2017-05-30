'use strict';

/**
 * @ngdoc function
 * @name yogoApp.controller:CampaignaddCtrl
 * @description
 * # CampaignaddCtrl
 * Controller of the yogoApp
 */
angular.module('yogoApp')
  .controller('CampaignaddCtrl', function ($scope, $rootScope, $http, alert, authToken, API_URL, $state, $stateParams) {
    $scope.submit = function(){

      var url = 'http:/localhost:1337/player/create';
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
          alert('success', 'Success!', 'Campaign has been '+res.statusText+'!');
          $state.go('campaign');
        })
        .catch(function(err){
          alert('warning', 'Something went wrong :(', err);
          console.log(err);
        })
    };

    var index = $stateParams.index;
    console.log(index);
  });

  
