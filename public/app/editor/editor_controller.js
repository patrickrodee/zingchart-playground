

angular.module('zingClient')

.controller("EditorController", ['$scope', '$stateParams','Charts', 'ChartPost','Chart',  function($scope, $stateParams, Charts, ChartPost) {
	$('#sidebar').hide();

	$scope.aceLoad = function(_editor) {
		_editor.setOptions( {
			enableBasicAutocompletion: true,
			enableSnippets:true,
			enableLiveAutocompletion: true
		});
	};

	Charts.get({ id: $stateParams.id}, function (data) {	
		console.log("success!: " + JSON.stringify(data));
		$scope.chart = data;
		$scope.code  = data["data"];
		$scope.name  = data["name"]; 

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

		$scope.saveChart = function() { // 			var now = moment();
			var tempZingId = Math.floor(Math.random() * 1000);
			$scope.chart.name = $scope.name;
			$scope.chart.data = $scope.code;
			ChartPost.saveChart($scope.chart);
		};

	});

}]);
