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
    'address',
    '$http',
    '$scope',
    'states',
    '$window',
  function (address, $http, $scope, states, $window) { // note the added $http depedency

    if (address.getLatLong()) {
      var object = address.getLatLong();
      $scope.latitude = object.latitude;
      $scope.longitude = object.longitude;
      $scope.fDisplayLatLong = true;
    }
    else {
      $scope.latitude = 0;
      $scope.longitude = 0;
      $scope.fDisplayLatLong = false;
    }

    if (address.getAddress()) {
      $scope.address = address.getAddress();
    }
    else {
      $scope.address = {};
    }
	
		$scope.states = states.states();

    // This is our method that will post to our server.
    $scope.addressSubmit = function () {
      
      // make sure all fields are filled out...
      if (
         !$scope.address.street ||
          (!$scope.address.state && !$scope.address.zip) ||
          ($scope.address.street && !$scope.address.city && $scope.address.state)
      ) {
        $window.alert('Please fill out street address, city, and state, OR street address and zipcode');
        return false;
      }
      else {
        address.setAddress($scope.address);
      }

			$http({
				method: 'POST',
				data: $scope.address,
				url: '/geo'
			}).then(function successCallback(response) {
        if (response.status === 200) {
          $scope.longitude = response.data.x;
          $scope.latitude = response.data.y;
          address.setLatLong($scope.latitude, $scope.longitude);
          $scope.fDisplayLatLong = true;
        }
        else {
          $scope.fDisplayLatLong = false;
          $window.alert(response.data.message);
        }
			}, function errorCallback(response) {
        $scope.fDisplayLatLong = false;
        $window.alert(response.data.message);
			});
    };
  }]);
