var app = angular.module('reticoloQR');

app.controller('PopupCtrl', ['$scope', function($scope){
    var confirmQRMarker = function(){
      console.log('confirm!');
    };

    angular.extend($scope,{
    	confirmQRMarker: confirmQRMarker
    });
}]);