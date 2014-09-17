// public/core.js
angular.module('zingClient', ['ui.router', 'ngResource', 'ui.bootstrap', 'ngMaterial', 'ui.ace'])

.config(function($stateProvider, $urlRouterProvider) {
	//
	// For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/client/1/charts");
	//
	$urlRouterProvider.when('/admin', '/admin/clients/list');
	// Now set up the states
	$stateProvider
	.state('admin', {
			url: "/admin",
			abstract:true,
			templateUrl: "/app/admin/views/home.html"
	})
	.state('admin.clientsList', {
			url: "/clients/list",
			templateUrl: "/app/clients/views/list.html",
			controller: 'ClientListCtrl'
	})
	.state('client', {
			// url: '/client/:clientId',
			url: '/client/:clientId',
			templateUrl: '/app/clients/views/home.html',
			controller: 'ClientDetailCtrl'
	})
	.state('client.users', {
			url: '/users',
			templateUrl: '/app/users/views/list.html',
			controller: 'UserListCtrl'
	})
	.state('client.groups', {
			url: '/groups',
			templateUrl: '/app/groups/views/list.html',
			controller: 'GroupListCtrl'
	})
	.state('client.charts', {
			url: '/charts',
			templateUrl: '/app/charts/views/list.html',
			controller: 'ChartListCtrl',
			onExit: function() {
			var  view = $('#chart_preview-progress');
			if (view) {
				view.remove();
			}
			},
			onReturn: function() {
				var  view = $('#chart_preview-progress');
				if (view) {
					view.remove();
				}
			}
	})
	.state('client.support', {
			url: "/support",
			templateUrl: "/app/support/views/details.html",
			controller: 'SupportCtrl'
	})
	.state('client.editor', {
			url:'/editor',
			templateUrl: '/app/editor/views/editor.html',
			onEnter: function () {
				$("#sidebar").hide();
			}
	})
	.state('client.editor.ide', {
			url: '/ide/:zingId',
			views : {
				'ide': {
					templateUrl: '/app/editor/views/editor.ide.html',
					controller: 'EditorController',
					onEnter: function () {
						$("#sidebar").hide();
					}

				} ,
				// 'api' : {
				// 	templateUrl: 'partials/2/editor.api.html',
				// 	controller: 'ApiController'
				// },
				'preview' : {
					templateUrl: '/app/editor/views/editor.preview.html'
				}

				}
});});

/*.config(function($routeProvider) {
 $routeProvider
 .when('/', {
		 controller:'AdminCtrl',
		 templateUrl:'/app/admin/views/home.html'

 })
 .when('/somethingelse', {
		 controller:'ClientListCtrl',
		 templateUrl:'/app/clients/views/list.html'

 })
 .when('/client/:clientId', {
		 controller:'ClientDetailCtrl',
		 templateUrl:'/app/clients/views/command.html'
 })

})
.run(function($rootScope, $route) {
	$rootScope.layoutPartial = function(partialName) { return $route.current[partialName] };
});*/

