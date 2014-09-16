angular.module('app', ['ngMaterial', 'ui.grid'])

.controller('AppCtrl', function($scope, $materialDialog) {

  $scope.data = {};
  $scope.data.cb1 = true;
  $scope.data.cb2 = false;
  
   $scope.myData = [
      {
          "firstName": "Cox",
          "lastName": "Carney",
          "company": "Enormo",
          "employed": true
      },
      {
          "firstName": "Lorraine",
          "lastName": "Wise",
          "company": "Comveyer",
          "employed": false
      },
      {
          "firstName": "Nancy",
          "lastName": "Waters",
          "company": "Fuelton",
          "employed": false
      }
  ];
  
  $scope.dialog = function(e) {
    $materialDialog({
      templateUrl: 'my-dialog.html',
      targetEvent: e,
      controller: ['$scope', '$hideDialog', function($scope, $hideDialog) {
        $scope.close = function() {
          $hideDialog();
        };
      }]
    });
  };

});