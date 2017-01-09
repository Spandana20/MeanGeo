'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AllWeatherCtrl
 * @description
 * # AllWeatherCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('AllWeatherCtrl', [
    '$http',
    '$scope',
    '$stateParams',
    '$window',
  function ($http, $scope, $stateParams, $window) {

    $scope.latitude = $stateParams.latitude;
    $scope.longitude = $stateParams.longitude;

    $scope.data = $http({
        method: 'POST',
        data: {
          latitude: $scope.latitude,
          longitude: $scope.longitude
        },
        url: '/allWeather'
      }).then(function successCallback(response) {
        console.log('got the weather');
        $scope.data = response.data;
      }, function errorCallback(response) {
        $window.alert(response.data.message);
      });

  }]);
