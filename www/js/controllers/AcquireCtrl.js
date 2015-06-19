var app = angular.module('reticoloQR');

app.controller('AcquireCtrl', ['$scope','$cordovaBarcodeScanner','$state','markerObject',
	function($scope,$cordovaBarcodeScanner,$state,markerObject){
	  $scope.scanBarcode = function(){
	    try {
	      $cordovaBarcodeScanner.scan().then(function(barcodeData){
	        markerObject.setJson(JSON.stringify(barcodeData));
	        markerObject.setMd5(md5(barcodeData.text)); // TODO convert md5 in a service
	        // TODO Request coordinates to the server if markup already registered
	        $state.go('map');
	      },function(error){
	        console.log(error);
	      });
	    }
	    catch (e) {
	      console.log(e);
	      markerObject.setJson('{text:"test"}');
	      $state.go('map');
	    }
  };
}]);