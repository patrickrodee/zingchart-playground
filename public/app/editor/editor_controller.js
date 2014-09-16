
angular.module('zingClient').factory('ChartPost', ['$http', function ($http) {
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


angular.module('zingClient')

.controller("EditorController", ['$scope', '$stateParams','Charts', '_charts', 'ChartPost',
		function($scope, $stateParams, Charts, _charts, ChartPost) {
			$('#sidebar').hide();
			
			// UNCOMMENT THIS! Had server connection issues so i'm using dummy data for now
		//	$scope.chart = Charts.query($stateParams);
		//	$scope.code =  $scope.chart.data;
			$scope.chart = _charts[1];
			var json = {"graphset": []};
			$scope.code = JSON.stringify(json, null, '\t');
			// $scope.code =  $scope.chart.data;
			$scope.aceLoad = function(_editor) {
				_editor.setOptions( {
					enableBasicAutocompletion: true,
					enableSnippets:true,
					enableLiveAutocompletion: true
				});
			};

			$scope.chartName = "Name Your Chart!";

			$scope.$watch('code', function(){
				try {
				var height = $('#editor-ide').height() - $('#top-toolbar').height();
				$('#editor-json').height(height);
					$scope.json_to_render = {'data': $scope.code};
					zingchart.exec('editor_preview', 'setdata', $scope.json_to_render);
					var height = $('#editor-ide').height() - $('#top-toolbar').height();
					$('#editor_preview').height(height);
				}catch(exp){};
			});
			
			$scope.saveChart = function() {
				var now = moment();
				var tempZingId = Math.floor(Math.random() * 1000);
				ChartPost.saveChart({
					zingId: 	tempZingId,
					name: 		$scope.chartName,
					data: 		$scope.code,
					created: 	now
				});
			};
}]);
