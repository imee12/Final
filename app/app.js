angular.module('MyApp', [
  'ngMessages',
  'ngRoute',
  'ngSanitize',
  'mgcrea.ngStrap',
  'auth',
  'profile',
  'posts'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/views/home.html'
      })
      .when('/parent', {
        templateUrl: 'home/views/medtx.html'
      })

      .when('/404', {
        template: '<h1>Sorry, page not found</h1>'
      })
      .otherwise({ redirectTo: '/404' });


  });
