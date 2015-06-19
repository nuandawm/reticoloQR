var app = angular.module('reticoloQR', ['ionic','ngCordova','leaflet-directive']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html'
    })
    .state('acquire', {
      url: '/acquire',
      templateUrl: 'templates/acquire.html',
      controller: 'AcquireCtrl'
    })
    .state('map', {
      url: '/map',
      templateUrl: 'templates/map.html',
      controller: 'MapCtrl'
    });
}]);

app.service('markerObject', function(){
  var properties = {
    json: '',
    md5: ''
  };

  return {
    getJson(){
      return properties.json;
    },
    setJson(json){
      properties.json = json;
    },
    getMd5(){
      return properties.md5;
    },
    setMd5(md5){
      properties.md5 = md5;
    }
  };
});

app.service('md5', function(){
  return {
    md5: md5
  };
});