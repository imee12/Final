(function () {
    "use strict";

    angular
        .module('tx', [
            "ngRoute"

        ])
        .config(function ($routeProvider) {
          var checkAuth = function ($q, $location, $auth) {
            var dfd = $q.defer();
            if(!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              dfd.resolve();
            }
            return dfd.promise;
          };
            $routeProvider
                .when('/tx', {
                    templateUrl: 'tx/views/list.html',
                    controller: 'txController as txCtl'
                })
                .when('/tx/new', {
                    templateUrl: 'tx/views/create.html',
                    controller: 'txController as txCtl',
                    resolve: {
                      authenticated: checkAuth
                    }
                })
                .when('/tx/:txId', {
                    templateUrl: 'tx/views/show.html',
                    controller: 'txController as txCtl'
                })
                .when('/tx/:txId/edit', {
                    templateUrl: 'tx/views/edit.html',
                    controller: 'txController as txCtl',
                    resolve: {
                      authenticated: checkAuth
                    }
                });
        });

})();
