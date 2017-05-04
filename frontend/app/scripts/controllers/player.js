'use strict';

angular.module('yogoApp')
  .controller('PlayerCtrl', function ($rootScope, $scope, sharedService, $timeout) {
    var peer = new Peer({key: 'lwjd5qra8257b9'});
    

 
     $scope.arr = [];
    

  $scope.$watch("arr", function() {
    console.log("**** reference checkers $watch ****")
  });

  $scope.$watchCollection("arr", function() {
    console.log("**** Collection  checkers $watchCollection ****")
  });



  $timeout(function(){
     console.log("Triggers All ")
     $scope.arr = [];
     $scope.$digest();


      peer.on('open', function(id) {
        $scope.arr.push(id);
        console.log('My peer ID is: ' + id);
        console.log( $scope.arr);
        $scope.getPeer(id);
         $scope.$digest();
    });

    peer.on('connection', function(conn) {
  conn.on('data', function(data){
    // Will print 'hi!'
    console.log(data);
    $scope.getData(data);
    $scope.status = "Hi, Iam connected" + data;
    $scope.$digest();
  });
});
     
  });

  
    $scope.getData = function(data){
      $scope.rData = data;
    }

     $scope.getPeer = function(id) {
        $scope.rString = id;
      };
   
 


  });
