'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'uiGmapgoogle-maps'
  ])
  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })
  .config([
    '$locationProvider',
    '$stateProvider',
		'uiGmapGoogleMapApiProvider', 
    '$urlRouterProvider',
    function ($locationProvider, $stateProvider, uiGmapGoogleMapApiProvider, $urlRouterProvider) {
      $locationProvider.hashPrefix("");
			uiGmapGoogleMapApiProvider.configure({
				v: '3.20',
				libraries: 'weather,geometry,visualization'
			});
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('map', {
        url: '/map/:latitude?longitude',
        templateUrl: 'views/map.html',
        controller: 'MapCtrl',
        controllerAs: 'map'
      });
    $urlRouterProvider.otherwise('/');
  }
]);
