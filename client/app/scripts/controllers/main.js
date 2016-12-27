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
    console.log('MainCtrl');

		$scope.lattitude = 0;
		$scope.longitude = 0;

		$scope.states = [
			{
				"name": "Alabama",
				"abbreviation": "AL"
			},
			{
				"name": "Alaska",
				"abbreviation": "AK"
			},
			{
				"name": "Arizona",
				"abbreviation": "AZ"
			},
			{
				"name": "Arkansas",
				"abbreviation": "AR"
			},
			{
				"name": "California",
				"abbreviation": "CA"
			},
			{
				"name": "Colorado",
				"abbreviation": "CO"
			},
			{
				"name": "Connecticut",
				"abbreviation": "CT"
			},
			{
				"name": "Delaware",
				"abbreviation": "DE"
			},
			{
				"name": "District Of Columbia",
				"abbreviation": "DC"
			},
			{
				"name": "Florida",
				"abbreviation": "FL"
			},
			{
				"name": "Georgia",
				"abbreviation": "GA"
			},
			{
				"name": "Hawaii",
				"abbreviation": "HI"
			},
			{
				"name": "Idaho",
				"abbreviation": "ID"
			},
			{
				"name": "Illinois",
				"abbreviation": "IL"
			},
			{
				"name": "Indiana",
				"abbreviation": "IN"
			},
			{
				"name": "Iowa",
				"abbreviation": "IA"
			},
			{
				"name": "Kansas",
				"abbreviation": "KS"
			},
			{
				"name": "Kentucky",
				"abbreviation": "KY"
			},
			{
				"name": "Louisiana",
				"abbreviation": "LA"
			},
			{
				"name": "Maine",
				"abbreviation": "ME"
			},
			{
				"name": "Maryland",
				"abbreviation": "MD"
			},
			{
				"name": "Massachusetts",
				"abbreviation": "MA"
			},
			{
				"name": "Michigan",
				"abbreviation": "MI"
			},
			{
				"name": "Minnesota",
				"abbreviation": "MN"
			},
			{
				"name": "Mississippi",
				"abbreviation": "MS"
			},
			{
				"name": "Missouri",
				"abbreviation": "MO"
			},
			{
				"name": "Montana",
				"abbreviation": "MT"
			},
			{
				"name": "Nebraska",
				"abbreviation": "NE"
			},
			{
				"name": "Nevada",
				"abbreviation": "NV"
			},
			{
				"name": "New Hampshire",
				"abbreviation": "NH"
			},
			{
				"name": "New Jersey",
				"abbreviation": "NJ"
			},
			{
				"name": "New Mexico",
				"abbreviation": "NM"
			},
			{
				"name": "New York",
				"abbreviation": "NY"
			},
			{
				"name": "North Carolina",
				"abbreviation": "NC"
			},
			{
				"name": "North Dakota",
				"abbreviation": "ND"
			},
			{
				"name": "Ohio",
				"abbreviation": "OH"
			},
			{
				"name": "Oklahoma",
				"abbreviation": "OK"
			},
			{
				"name": "Oregon",
				"abbreviation": "OR"
			},
			{
				"name": "Pennsylvania",
				"abbreviation": "PA"
			},
			{
				"name": "Rhode Island",
				"abbreviation": "RI"
			},
			{
				"name": "South Carolina",
				"abbreviation": "SC"
			},
			{
				"name": "South Dakota",
				"abbreviation": "SD"
			},
			{
				"name": "Tennessee",
				"abbreviation": "TN"
			},
			{
				"name": "Texas",
				"abbreviation": "TX"
			},
			{
				"name": "Utah",
				"abbreviation": "UT"
			},
			{
				"name": "Vermont",
				"abbreviation": "VT"
			},
			{
				"name": "Virginia",
				"abbreviation": "VA"
			},
			{
				"name": "Washington",
				"abbreviation": "WA"
			},
			{
				"name": "West Virginia",
				"abbreviation": "WV"
			},
			{
				"name": "Wisconsin",
				"abbreviation": "WI"
			},
			{
				"name": "Wyoming",
				"abbreviation": "WY"
			}
		];
	$scope.address = {};
	
    // This is our method that will post to our server.
    $scope.addressSubmit = function () {
      console.log('addressSubmit');
      console.log('address = ' + JSON.stringify($scope.address, null, 2));
      
      // make sure all fields are filled out...
      if (
        !$scope.address.street ||
        !$scope.address.city ||
        !$scope.address.state ||
        !$scope.address.zip
      ) {
        $window.alert('Please fill out all form fields.');
        return false;
      }

			$http({
				method: 'POST',
				data: $scope.address,
				url: '/geo'
			}).then(function successCallback(response) {
				$scope.lattitude = response.data.x;
				$scope.longitude = response.data.y;

        console.log(JSON.stringify(response.data));
			}, function errorCallback(response) {
				console.log(JSON.stringify(response.data));
			});

    };
    
  }]);
