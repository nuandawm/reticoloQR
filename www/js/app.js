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
        // TODO Request coordinates to the server if markup already registered
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

app.controller('MapController', function($scope, $compile, $cordovaGeolocation, leafletData){
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        // Place the center based on geolocation
        angular.extend($scope,{
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            zoom: 17
          }
        });

        // Place a circle to highlight the accuracy
        leafletData.getMap().then(function(map){
          var accuracyCircle = L.circle($scope.center, position.coords.accuracy).addTo(map);
          accuracyCircle.on('click',function(e){
            var markerPosition = L.marker(e.latlng).addTo(map);
            markerPosition.bindPopup('Is this the QRcode position? <button ng-click="confirmLocation()">yes</button><button>no</button>').openPopup();
          });
        });
        
        // Bind the click on the map
        $scope.$on('leafletDirectiveMap.click', function(event){
          console.log('map click');
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
      paths: {},
      markers: {},
      events: {
        map: {
          enable: ['click'],
          logic: 'emit'
        }
      }
    });
  });