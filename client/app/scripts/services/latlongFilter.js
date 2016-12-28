'use strict';

angular.module('clientApp')
  .filter('latlong', ['$sce', function ($sce) {
		// modified from Ryan Chenkie: 
		// http://ryanchenkie.com/angularjs-custom-filters/
    function toDegreesMinutesSeconds(coordinate) {
      var degrees = coordinate[0].split('.')[0];
      var minutes = Math.abs(
                      Math.floor(60 * (Math.abs(
                        coordinate[0]) - Math.abs(degrees))));
      var seconds = 3600 * (Math.abs(coordinate[0]) -
                            Math.abs(degrees) -
                            Math.abs(minutes) / 60).toFixed(2);

      return $sce.trustAsHtml(degrees + '° ' + minutes + '′ ' + seconds + '″ ');
    }

		function coordinateIsValid(coordinate, type) {
			if (coordinate) {
			
				// The degree values of latitude coordinates have a range 
				// between -90 and 90
				if (coordinate[0] && type === 'lat') {
					if (!parseInt(coordinate[0]).between(-90, 90)) {
						return false;
					}
				}
				// The degree values longitude coordinates have a range 
				// between -180 and 180
				else if (coordinate[0] && type === 'lon') {
					if (!parseInt(coordinate[0]).between(-180, 180)) {
						return false;
					}
				}
				// Minutes and seconds can only be between 0 and 60
				if (coordinate[1]) {
					if (!parseInt(coordinate[1]).between(0, 60)) {
						return false;
					}
				}
				if (coordinate[2]) {
					if (!parseInt(coordinate[2]).between(0, 60)) {
						return false;
					}
				}
			}

			// If the coordinate made it through all the rules above,
			// the function returns true because the coordinate is good
			return true;
		}

    return function (number, type) {
      if (!isNaN(number)) {
        var pattern = /[-+]?[0-9]*\.?[0-9]+/g;

        var  str = number.toString();

        var aMatches = str.match(pattern);

        if (aMatches && coordinateIsValid(aMatches, type)) {
          if (aMatches.length === 1) {
            return toDegreesMinutesSeconds(aMatches);
          }
        }
      }

      return "Invalid Coordinate!";
    };

  }]
);
