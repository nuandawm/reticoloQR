// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngCordova','leaflet-directive'])

.run(function($ionicPlatform) {
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
  $urlRouterProvider.otherwise('/map');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html'
    })
    .state('acquire', {
      url: '/acquire',
      templateUrl: 'templates/acquire.html',
      controller: 'AcquireController'
    })
    .state('map', {
      url: '/map',
      templateUrl: 'templates/map.html',
      controller: 'MapController'
    });
}]);

var markerObject = {};
app.controller('AcquireController', function($scope,$cordovaBarcodeScanner, $state){
  $scope.scanBarcode = function(){
    try {
      $cordovaBarcodeScanner.scan().then(function(barcodeData){
        markerObject.json = JSON.stringify(barcodeData);
        markerObject.md5 = md5(barcodeData.text);
        // Request coordinates to the server if markup already registered
        $state.go('map');
      },function(error){
        console.log(error);
      });
    }
    catch (e) {
      console.log(e);
      markerObject.json = '{text:"test"}';
      $state.go('map');
    }
  };
});

app.controller('MapController', function($scope,$cordovaGeolocation){
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        angular.extend($scope,{
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            zoom: 17
          }
        });
        angular.extend($scope, {
          paths: {
            c1: {
              weight: 2,
              color: '#ff612f',
              latlngs: $scope.center,
              radius: position.coords.accuracy,
              type: 'circle'
            }
          }
        });
      }, function(err) {
        console.log(err.message);
      });
      
    angular.extend($scope, {
      defaults: {
        scrollWheelZoom:false
      },
      center: {
        lat: 40.095,
        lng: -3.823,
        zoom: 4
      },
      paths: {}
    });
  });