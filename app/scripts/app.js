'use strict';

angular
  .module('mdmApp', [
    'ngSanitize',
    'ngRoute',
    'ngStorage',
    'angulartics',
    'angulartics.google.analytics'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/card/:slug', {
        templateUrl: 'views/card.html',
        controller: 'CardCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
