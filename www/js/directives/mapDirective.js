var app = angular.module('starter');

app.directive('mapDirective', function(){
	
	return {
		template: '<leaflet width="100%" height="400px" center="center"></leaflet>',
		link: function(scope, element, attrs){
			scope.confirmLocation = function(){
				console.log('test');
			};
		}
	};
});