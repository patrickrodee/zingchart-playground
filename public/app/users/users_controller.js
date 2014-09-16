angular.module('zingClient')

	.controller('UserListCtrl', ['$scope', '$materialDialog', 'Users', function($scope, $materialDialog, Users){
	  
		$scope.users = Users.query({clientId: $scope.clientId});
			
		$scope.removeUser = function(id) {
            
            Users.remove({id: id}, function(data){
			  $scope.users = data;
			  $scope.alerts.push({
				 type: 'success',
				 msg: 'User Removed Successfully'
			  });
			},
			function(err){
			  console.log('Error: ' + data);
              $scope.alerts.push({
                  type: 'error',
                  msg: "User was not removed."
              });
			});
        };
    
        $scope.openUser = function (user) {
    
            user = user || {_clientId: $scope.clientId};
			
			$materialDialog({
			  templateUrl: '/app/users/views/details.html',
			  controller: 'UserInstanceCtrl',
			  locals: {user: user, parentScope: $scope}
			  
			});
            
        };
	  
	}])

    .controller('UserInstanceCtrl', ['$scope',  'Users', 'user', 'parentScope', '$hideDialog', function ($scope,  Users, user, parentScope, $hideDialog) {

		$scope.user = angular.copy(user);
		
		$scope.add = function () {
		  Users.save($scope.user, function(data){
		  	parentScope.users = data;
			$hideDialog();
		  },
		  function(error){
			console.log(error);
			$hideDialog();
		  });
		};
		
		$scope.save = function () {
		  Users.update($scope.user, function(data){
			  parentScope.users = data;
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

