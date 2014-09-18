

angular.module('zingClient')

.controller("EditorController", ['$scope', '$stateParams','Charts', 'ChartPost', 'Resizer', function($scope, $stateParams, Charts, ChartPost, Resizer) {
	$('#sidebar').hide();

	$scope.aceLoad = function(_editor) {
		_editor.setOptions( {
			enableBasicAutocompletion: true,
			enableSnippets:true,
			enableLiveAutocompletion: true
		});
	};
	var chartId = $stateParams.id;
	if(chartId) {
	Charts.get({ id: $stateParams.id}, function (data,err) {	

		$scope.chart = data;
		$scope.$watch('chart.data', function(){
			try {
				var height = $('#editor-ide').height() - $('#top-toolbar').height();
				$('#editor-json').height(height);
				$scope.json_to_render = {'data': $scope.chart.data};
				zingchart.exec('editor_preview', 'setdata', $scope.json_to_render);
				var height = $('#editor-ide').height() - $('#top-toolbar').height();
				$('#editor_preview').height(height);
			}catch(exp){};
		});

		$scope.saveChart = function() { // 			var now = moment();
			ChartPost.saveChart($scope.chart);
		};

	});
	} else { 
		var json =  { "graphset": []};
		$scope.chart  = {
			name: 'untitled',
			data: JSON.stringify(json, null, '\t')
		};
		

		$scope.$watch('chart.data', function(){
			try {
				var height = $('#editor-ide').height() - $('#top-toolbar').height();
				$('#editor-json').height(height);
				$scope.json_to_render = {'data': $scope.chart.data};
				zingchart.exec('editor_preview', 'setdata', $scope.json_to_render);
				var height = $('#editor-ide').height() - $('#top-toolbar').height();
				$('#editor_preview').height(height);
			}catch(exp){};
		});

		$scope.saveChart = function() { // 			var now = moment();
			ChartPost.saveChart($scope.chart);
		};


	}

}]);
