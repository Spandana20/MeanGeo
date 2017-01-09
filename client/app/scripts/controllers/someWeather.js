'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SomeWeatherCtrl
 * @description
 * # SomeWeatherCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('SomeWeatherCtrl', [
    '$http',
    '$scope',
    '$stateParams',
    '$window',
  function ($http, $scope, $stateParams, $window) {

    $scope.loading = true;
    $scope.latitude = $stateParams.latitude;
    $scope.longitude = $stateParams.longitude;
		$scope.maxTemp = 0;
		$scope.minTemp = 0;
		$scope.summary = '';
		$scope.urlMore = '';
		$scope.icon = '';

    $http({
      method: 'POST',
      data: {
        latitude: $scope.latitude,
        longitude: $scope.longitude
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
  }]);
