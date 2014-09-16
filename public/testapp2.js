angular.module('app', ['ngMaterial', 'ui.grid'])

.controller('AppCtrl',  function($scope, $materialDialog) {

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
   
   $scope.open = function(){
    alert("FOO");
   }
   
   $scope.gridOptions = {
			data: $scope.myData,
			enableFiltering: false,
            columnDefs: [
                {field:'firstName'},
                {field: 'lastName', cellTemplate: '<div class="ui-grid-cell-contents"><a ng-click="angular.element(document.getElementById(\'clientGrid\')).scope().open(\'{{COL_FIELD}}\')">Edit</a><a class="material-button material-button-colored" ng-click="foo()">Bye</a></div>'}
            ]
            
		};
  
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