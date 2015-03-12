(function () {
    "use strict";

    angular
        .module('tx')
        .controller('txController', ['txsService', '$location', '$routeParams', '$auth',
        function(txsService, $location, $routeParams, $auth) {
            var txCtl = this;
            txCtl.isAuthenticated = function () {
              return $auth.isAuthenticated();
            }

            txsService.getTxs().success(function (txs) {
                txCtl.txs = txs;
            });

            txsService.getTx($routeParams.txId).success(function (tx) {
                txCtl.tx = tx;
            });

            txCtl.createTx = function (newTx) {
                txsService.createTx(newTx);
                $location.path('/tx');
            };

            txCtl.editTx = function (tx) {
                txsService.editTx(tx);
                $location.path('/tx');
            };

            txCtl.deleteTx = function (id) {
                txsService.deleteTx(id);
                $location.path('/tx');
            }


        }]);
})();
