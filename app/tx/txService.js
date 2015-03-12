(function () {
    "use strict";

    angular
        .module('tx')
        .factory('txsService', ['$http', '$rootScope', function ($http, $rootScope) {


            // public service methods
            return {
                getTxs: getTxs,
                getTx: getTx,
                createTx: createTx,
                editTx: editTx,
                deleteTx: deleteTx
            };

            function getTxs() {

              return $http.get("api/collections/tx/");

            }

            function getTx(txId) {
              return $http.get("api/collections/tx/" + txId);


            }

            function createTx(newTx) {
                $http.post("api/collections/tx/", newTx).then(function (res) {
                    $rootScope.$broadcast("tx:added");
                });
            }

            function editTx(tx) {
                $http.put("api/collections/tx/" + tx._id, tx).then(function (res) {
                    $rootScope.$broadcast("tx:updated");
                });

            }

            function deleteTx(txId) {
                $http.delete("api/collections/tx/" + txId).then(function (res) {
                    $rootScope.$broadcast("tx:deleted");
                });
            }



        }]);
})();
