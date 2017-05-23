angular.module('yogoApp').config(function($urlRouterProvider, $stateProvider, $httpProvider){

    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('main', {
        url: '/',
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
    })

    .state('register', {
        url: '/register',
        templateUrl: '/views/register.html',
        controller:'RegisterCtrl'
    })
    .state('login', {
        url: '/login',
        templateUrl: '/views/login.html',
        controller:'LoginCtrl'
    })
    .state('player', {
        url: '/player',
        templateUrl: '/views/player.html',
        controller:'PlayerCtrl'
    })
    .state('campaign', {
        url: '/campaign',
        templateUrl: '/views/campaign.html',
        controller:'CampaignCtrl'
    })
    .state('campaignadd', {
        url: '/campaignadd',
        templateUrl: '/views/campaignadd.html',
        controller:'CampaignaddCtrl'
    })
    .state('campaignupdate', {
        url: '/campaignupdate',
        templateUrl: '/views/campaignupdate.html',
       params:      {'index': null},
        controller:'CampaignupdateCtrl'
    })
    .state('campaigndelete', {
        url: '/campaigndelete',
        params:      {'index': null},
        controller:'CampaigndeleteCtrl'
    })
    .state('logout', {
        url: '/logout',
        controller:'LogoutCtrl'
    });

    $httpProvider.interceptors.push('authInterceptor');
}).constant('API_URL', 'http://designerlabs.ddns.net:3000/')
.run(function ($window){
    var params = $window.location.search.substring(1);
    if(params && $window.opener && $window.opener.location.origin === $window.location.origin){
        var pair = params.split('=');
        var code = decodeURIComponent(pair[1]);

        $window.opener.postMessage(code, $window.location.origin)
    }
});
