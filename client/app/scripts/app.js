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
    'ui.router'
  ])
  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })
  .config([
    '$locationProvider',
    '$stateProvider',
    '$urlRouterProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider) {
      $locationProvider.hashPrefix("");
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      });
    $urlRouterProvider.otherwise('/');
  }
]);
