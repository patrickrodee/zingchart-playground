angular.module('zingClient')

   .controller('Client')

    .controller('ClientListCtrl', ['$scope', '$materialDialog', 'Clients', function($scope, $materialDialog, Clients){
        $scope.alerts = [];
	
        $scope.clients = Clients.query();
		
		
		$scope.gridOptions = {
			data: $scope.clients,
			enableFiltering: false,
			columnDefs: [
			  { field: 'name', cellTemplate: '<div class="ui-grid-cell-contents"><a ng-href="#/client/{{row.entity[\'_id\']}}">{{row.entity["name"]}}</a></div>' },
			  { field: 'created', cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD | date}}</div>' },
			  { field: 'key'},
			  { field: '_id', cellTemplate: '<div class="ui-grid-cell-contents"><a onclick="angular.element(document.getElementById(\'clientGrid\')).scope().open(\'COL_FIELD\')">Edit</a> <a onclick="angular.element(document.getElementById(\'clientGrid\')).scope().remove(\'COL_FIELD\')">Remove</a></div>'}
			]
            
		};
		
        $scope.remove = function(id) {
			Clients.remove({id: id}, function(data){
			  $scope.clients = data;
			  $scope.gridOptions.data = $scope.clients;
			  $scope.alerts.push({
				 type: 'success',
				 msg: 'Client Removed Successfully'
			  });
			},
			function(err){
			  console.log('Error: ' + data);
              $scope.alerts.push({
                  type: 'error',
                  msg: "Client was not removed."
              });
			});
        };
    
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    
        $scope.open = function (client) {
			client = client || {
                    ips:[{value: '1.2.3.2'}, {value: 'mydomain.com'}],
                    usage:{
                            allowed:{
                                    get:{
                                            day:10,
                                            week:30,
                                            month:100,
                                            total:1000
                                    },
                                    put:{
                                            day:100,
                                            week:300,
                                            month:1000,
                                            total:10000
                                    },
                                    render:{
                                            day:1000,
                                            week:3000,
                                            month:-1,
                                            total:-1
                                    }
                            }
                    }
            };
			
			var modalInstance = $materialDialog({
			  templateUrl: '/app/clients/views/details.html',
			  controller: 'ClientInstanceCtrl',
			  locals: {client: client, parentScope: $scope}
			  
			});
			
			
        }; 
        
    }])
    
    .controller('ClientInstanceCtrl', ['$scope',  'Clients', 'client', 'parentScope', '$hideDialog', function($scope, Clients, client, parentScope, $hideDialog){
        $scope.client = client;
		
		$scope.addIp = function () {
		    $scope.client.ips.push({value: ""});
		};
		
		$scope.removeIp = function(index){
		    $scope.client.ips.splice(index, 1);
		}
		
		$scope.add = function () {
          Clients.save($scope.client, function(data){
		  	parentScope.clients = data;
			parentScope.gridOptions.data = data;
			$hideDialog();
		  },
		  function(error){
			console.log(error);
			$hideDialog();
		  });
		  
		};
		
		$scope.save = function () {
          Clients.update($scope.client, function(data){
			  parentScope.clients = data;
			  parentScope.gridOptions.data = data;
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
        
    }])
    
    .controller('ClientDetailCtrl', ['$scope', '$stateParams', 'Clients', function($scope, $stateParams, Clients){

        var clientId = $scope.clientId = $stateParams.clientId;
        $scope.client = Clients.get({id: clientId});
        
    }]);
