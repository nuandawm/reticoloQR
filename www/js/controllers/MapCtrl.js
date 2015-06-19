var app = angular.module('reticoloQR');

app.controller('MapCtrl', ['$scope','$compile','$cordovaGeolocation','leafletData','markerObject',
  function($scope,$compile,$cordovaGeolocation,leafletData,markerObject){
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
        $scope.paths.accuracyCircle = {
              type: "circle",
              radius: position.coords.accuracy,
              latlngs: $scope.center,
              weight: 1
          };
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
        },
        path: {
          enable: ['click'],
          logic: 'broadcast'
        }
      }
    });
    
    // Bind the click on the map
    if ($scope.mapEventListener)
      $scope.mapEventListener();
    var mapEventListener = $scope.$on('leafletDirectiveMap.click', function(event,args){
      console.log(args);
    });

    // Bind the click on a path (don't know why the controller is called twice)
    if ($scope.pathEventListener)
      $scope.pathEventListener();
    var pathEventListener = $scope.$on('leafletDirectivePath.click', function(event,args){
      console.log(args);
      $scope.markers.QRmarker = {
        lat: args.leafletEvent.latlng.lat,
        lng: args.leafletEvent.latlng.lng,
        message: '<ng-include src="\'templates/qrMarkerPopup.html\'"></ng-include>',
        compileMessage: true,
        focus: true,
        draggable: false
      };
    });

    angular.extend($scope,{
      pathEventListener: pathEventListener,
      mapEventListener: mapEventListener
    });
  }]);