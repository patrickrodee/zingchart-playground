angular.module('zingClient')
	.factory('Auth', [
		'$http',
		'$location',
		'$rootScope',
		function ($http, $location, $rootScope) {
			
			return {

				// User Login ====================================
				login: function (user) {
					return $http.post('/api/login', user)
						.success(function(data) {
							$rootScope.currentUser = data;
							$location.path('/');
						})
						.error(function() {
							console.log("Error: login failed");
						});
				},

				// User Signup =================================
				signup: function (user) {
					return $http.post('/api/signup', user)
						.success(function() {
							$location.path('/login');
						})
						.error(function(response) {
							console.error(response.data);
						});
				},

				// User Logout ======================================
				logout: function () {
					return $http.get('/api/logout')
						.success(function() {
							$rootScope.currentUser = null;
						});
				}
			};
	}]);