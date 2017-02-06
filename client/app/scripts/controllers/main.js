'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', [
    '$http',
    '$scope',
    '$window',
  function ($http, $scope, $window) { // note the added $http depedency

    $scope.loading = true;
    $scope.aLocations = [];
		$scope.selectedIndex = -1;
		$scope.fShowWeatherJSON = false;

    console.log('MainCtrl');
    // This is our method that will post to our server.
    $http({
      method: 'GET',
      url: '/locations'
    }).then(function successCallback(response) {
      $scope.aLocations = response.data;
    }, function errorCallback(response) {
      $window.alert('Got an error from GET /locations');
    });

		$scope.showSelected = function(index) {
			console.log('select function');
			$scope.selectedIndex = index;	
			$scope.fShowWeatherJSON = false;

			$http({
				method: 'POST',
				data: {
					latitude: $scope.aLocations[$scope.selectedIndex].latitude,
					longitude: $scope.aLocations[$scope.selectedIndex].longitude
				},
				url: '/someWeather'
			}).then(function successCallback(response) {
				console.log('got the weather');
				$scope.maxTemp = response.data['Daily Maximum Temperature'];
				$scope.minTemp = response.data['Daily Minimum Temperature'];
				$scope.summary = response.data['summary'];
				$scope.urlMore = response.data['moreWeatherInformation'];
				$scope.icon = response.data['icon'];
				$scope.loading = false;
			}, function errorCallback(response) {
				$window.alert(response.data.message);
			});
		};

		$scope.showWeatherJSON = function() {
			if ($scope.fShowWeatherJSON) {
				$scope.fShowWeatherJSON = false;
			}
			else {
				$scope.data = $http({
						method: 'POST',
						data: {
							latitude: $scope.aLocations[$scope.selectedIndex].latitude,
							longitude: $scope.aLocations[$scope.selectedIndex].longitude
						},
						url: '/allWeather'
					}).then(function successCallback(response) {
						$scope.data = response.data;
						$scope.fShowWeatherJSON = true;
					}, function errorCallback(response) {
						$window.alert(response.data.message);
					});
			}
		};

  }]);
