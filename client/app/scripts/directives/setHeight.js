'use strict';

angular.module('clientApp')
  .directive('setHeight', [
    function () {
    return {
      link: function ($scope, $element, $attributes) {
        var width = $element[0].offsetWidth;
        var ratio = 0.67;
        var height;
        if ($scope.$eval($attributes.ratio)) {
          ratio = parseFloat($scope.$eval($attributes.ratio));
        }
        height = width * ratio;
        $element.css('height', height + 'px');
      }
    };
  }]);
