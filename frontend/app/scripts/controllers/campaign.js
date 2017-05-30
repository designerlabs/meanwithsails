'use strict';

angular.module('yogoApp')
  .controller('CampaignCtrl', function ($scope, $http, API_URL, alert, $state) {
     var peer = new Peer({key: 'lwjd5qra8257b9'});
    $http.get('http://localhost:1337/player')
    .then(function(jobs){
      $scope.jobs = jobs.data;
      $scope.trigger = function(itemId){
        console.log(itemId);
        var conn = peer.connect(itemId);
        conn.on('open', function(id){

                  // Receive messages
          conn.on('data', function(data) {
            console.log('Received', data);
          });

          conn.send(' Connected! '+id);
        });

        conn.on('close', function() {
          console.log('on close')
        });

    }
    })
    .catch(function(err){
      alert('warning', 'Unable to get jobs', err.message);
    });

    $scope.campaign = {
      add: function(){
        console.log('add');
         $state.go('campaignadd');
      },
      update: function(res){
       
        $state.go('campaignupdate', { 'index': res});
        console.log('update');
      },
      delete: function(res){
        var url = 'http://localhost:1337/player/'+res;
        $http.delete(url)
        .then(function(n){
          console.log('success');
          alert('success', 'Deleted!', 'Campaign has been '+n.statusText+'!');
          //$state.go('campaign');
          $http.get('http://localhost:1337/player')
            .then(function(jobs){
              $scope.jobs = jobs.data;
               })
            .catch(function(err){
              alert('warning', 'Unable to get jobs', err.message);
            });
        })
        .catch(function(err){
          alert('warning', 'Something went wrong :(', err);
          console.log(err);
        })
      }
    }


  });
