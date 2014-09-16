angular.module('zingClient')

	.controller('SupportCtrl', ['$scope',  'Support', '$materialToast', function($scope, Support, $materialToast){
		
		$scope.support = {};
		$scope.add = function () {
		  Support.save($scope.support, function(data){
		  	$scope.support = {};
			$materialToast({
				template: '<material-toast>Your request has been submitted.</material-toast>',
				duration: 2000,
				position: 'top right'
			  });
		  },
		  function(error){
			console.log(error);
			$materialToast({
				template: '<material-toast>There has been a problem with your request.  Please try again.</material-toast>',
				position: 'top right',
				duration: 2
			  });
		  });
		};
		
		$scope.reset = function(){
			$scope.support = {};
		}
    
        
	}]);

    