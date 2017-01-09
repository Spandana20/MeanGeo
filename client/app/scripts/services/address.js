'use strict';

function Address() {

  var _this = this;
  this.addressObject = {};
  this.fSetAddress = false;
  this.latlong = {};
  this.latlong.latitude = 0;
  this.latlong.longitude = 0;
  this.fSetLatLong = false;

  this.setAddress = function (addressObject) {
    _this.addressObject = addressObject;
    _this.fSetAddress = true;
  };

  this.getAddress = function () {
    if (_this.fSetAddress) {
      return _this.addressObject;
    }
    else {
      return false;
    }
  };

  this.setLatLong = function (lat, long) {
    _this.latlong.latitude = lat;
    _this.latlong.longitude= long;
    _this.fSetLatLong = true;
  };

  this.getLatLong = function () {
    if (_this.fSetLatLong) {
      return _this.latlong;
    }
    else {
      return false;
    }
  };

}

angular.module('clientApp')
  .factory('address', [function address() {
    return new Address();
  }]);
