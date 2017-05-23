'use strict';

/**
 * @ngdoc function
 * @name yogoApp.controller:CampaignupdateCtrl
 * @description
 * # CampaignupdateCtrl
 * Controller of the yogoApp
 */
angular.module('yogoApp')
  .controller('CampaignupdateCtrl', function ($scope, $rootScope, $http, alert, authToken, API_URL, $state, $stateParams) {

     var index = $stateParams.index;
   
     $http.get('http://localhost:1337/player/'+index)
    .then(function(jobs){
      $scope.campaignName = jobs.data.cmgn_name;
      $scope.campaignDesc = jobs.data.cmgn_desc;
      $scope.campaignLayout = jobs.data.cmgn_layout;
    })
    .catch(function(err){
      alert('warning', 'Unable to get jobs', err.message);
    });

    $scope.submit = function(){

      var url = 'http://localhost:1337/player/'+index;
      var user = {
        user_id: 'email',
        cmgn_name: $scope.campaignName,
        cmgn_desc: $scope.campaignDesc,
        cmgn_layout:$scope.campaignLayout,
        cmgn_pair_with: 'ABCEDE',
        cmgn_data:'{data:data}'
      };
      $http.put(url, user)
        .then(function(res){
          console.log('success');
          alert('success', 'Updated!', 'Campaign has been '+res.statusText+'!');
          $state.go('campaign');
        })
        .catch(function(err){
          alert('warning', 'Something went wrong :(', err);
          console.log(err);
        })
    };

   
  });

  
