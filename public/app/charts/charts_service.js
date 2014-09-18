angular.module('zingClient')

.factory('Charts', ['$resource', function($resource) {
		return $resource('/api/charts/:id/', {id : "@zingId"},
			{
				'update': {url: '/api/charts/:id/', method: 'PUT'},
				'get':    {url: '/api/charts/:id/', method:'GET'},
				'save':   {method:'POST', isArray:true},
				'query':  {method:'GET', isArray:true},
				'remove': {url: '/api/charts/:id/', method:'DELETE', isArray:true}
		});
}])

.factory('Chart', function($resource) {
    return $resource('/api/charts/:id');
})

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


