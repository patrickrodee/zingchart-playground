angular.module('zingClient')

.factory('Charts', ['$resource', function($resource) {
		return $resource('/api/charts/:id/', {id : "@zingId"},
			{
				'update': {method: 'PUT'},
				'get':    {method:'GET'},
				'save':   {method:'POST'},
				'query':  {url: '/api/charts/', method:'GET', isArray:true},
				'remove': {url: '/api/charts/:id/', method:'DELETE'}
		});
}])

.factory('ChartPost', ['$http', function ($http) {
	return {
		// Save Chart =================
		saveChart: function (chartData) {
			return $http.post('/api/postchart', chartData)
				.success(function(data) {
					console.log('Successfully saved!');
				})
		}
	};
}]);


