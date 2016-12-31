'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MapCtrl', [
    '$scope',
    '$stateParams',
		'uiGmapGoogleMapApi',
  function ($scope, $stateParams, uiGmapGoogleMapApi) {

    uiGmapGoogleMapApi.then(function(maps) {
      console.log('Google Maps loaded');
			$scope.latitude = $stateParams.latitude;
			$scope.longitude = $stateParams.longitude;

			console.log('MapCtrl x/y = ' + $scope.latitude + '/' + $scope.longitude);

			$scope.map = {
				center: {
					latitude: $scope.latitude,
					longitude: $scope.longitude
				},
				zoom: 15,
				options: {                    
					streetViewControl: false,
					mapTypeControl: false,
					scaleControl: false,
					rotateControl: false,
					zoomControl: false
				}
			};

			console.log('$scope.map.center = ' + JSON.stringify($scope.map.center, null, 2));

			$scope.marker = {
				id: 0,
				coords: {
					latitude: $scope.latitude,
					longitude: $scope.longitude
				},
				options: {
					draggable: false
				}
			};
    });
  }]);
