angular.module('auth')
  .controller('LoginCtrl', function($scope, $alert, $auth) {
    $scope.login = function() {
      $auth.login({ email: $scope.email, password: $scope.password, phone: $scope.phone })
        .then(function(res) {
          console.log(res.data);
          localStorage.setItem("phone", res.data.phone)
          $alert({
            content: 'You have successfully logged in',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .catch(function(response) {
          $alert({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(res) {
          console.log(res.data);
          $alert({
            content: 'You have successfully logged in',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .catch(function(response) {
          $alert({
            content: response.data ? response.data.message : response,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };
    $scope.getPhone = function () {
      console.log("login button works!");
      alert(localStorage.getItem('phone'));

    }


  });
