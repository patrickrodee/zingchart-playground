angular.module('zingClient')

	.controller('GroupListCtrl', ['$scope', '$materialDialog', 'Groups', function($scope, $materialDialog, Groups){
		
		$scope.groups = Groups.query({clientId: $scope.clientId});
		
		
		$scope.removeGroup = function(id) {
            
			Groups.remove({id: id}, function(data){
			  $scope.groups = data;
			  $scope.alerts.push({
				 type: 'success',
				 msg: 'Group Removed Successfully'
			  });
			},
			function(err){
			  console.log('Error: ' + data);
              $scope.alerts.push({
                  type: 'error',
                  msg: "Group was not removed."
              });
			});
        };
    
        $scope.openGroup = function (group) {
    
            group = group || {_clientId: $scope.clientId};
            
            $materialDialog({
			  templateUrl: '/app/groups/views/details.html',
			  controller: 'GroupInstanceCtrl',
			  locals: {group: group, parentScope: $scope}
			  
			});
        };
	}])

    .controller('GroupInstanceCtrl', ['$scope', 'Groups', 'group', 'parentScope', '$hideDialog', function ($scope, Groups, group, parentScope, $hideDialog) {

		$scope.group = angular.copy(group);
		
		$scope.add = function () {
		  Groups.save($scope.group, function(data){
		  	parentScope.groups = data;
			$hideDialog();
		  },
		  function(error){
			console.log(error);
			$hideDialog();
		  });
		};
		
		$scope.save = function () {
		  Groups.update($scope.group, function(data){
			  parentScope.groups = data;
			  $hideDialog();
		  },
		  function(error) {
			console.log(error);
			$hideDialog();
		  });
		};
		
		$scope.cancel = function () {
		  $hideDialog();
		};
    }]);