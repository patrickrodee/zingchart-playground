angular.module('zingClient')

    .directive('zingChartList', function() {
        return {
            restrict: 'E',
            templateUrl: '/app/charts/views/list.html',
            controller: 'ChartListCtrl'
        };
    })

		.directive('zingchart', function() {
	return {
		restrict: 'A',
		scope: {
			options: '=zcData'	
		},
		link: function($scope, $elem, attrs) {
			var options = $.extend( {id: attrs.id}, $scope.options);
			zingchart.render( options );
		}
	}
		});



