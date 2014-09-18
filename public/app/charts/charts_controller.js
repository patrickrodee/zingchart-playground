angular.module('zingClient')

.controller('ChartListCtrl', ['$scope', '$materialDialog', 'Charts', 'Resizer', function($scope, $materialDialog, Charts, Resizer){
	Resizer.element('#chart_preview');
	$scope.charts = Charts.query(function(data){ });

	$scope.aceLoaded = function(_editor) {

		// Editor part ----------------
		var _renderer = _editor.renderer;
		var _editSession = _editor.getSession();

		// Options --------------------------
		_editor.setHighlightActiveLine(false);
		_renderer.hideCursor(true);
		// text window resizing --------------
		var numRows = _editSession.getLength();
		var _min = 0;
		if(numRows < 2 ) {
			_min = 1;
		}
		else if(numRows < 5 ) {
			_min = 3;
		} else {
			_min = 12;
		}
		_editor.setOptions({
			maxLines:_min, 
			minLines:_min,
			fontSize:10
		});	
	};

	$scope.renderChart = function (data) {
		try {
			var json_to_render = {"data": data};
			zingchart.exec('chart_preview', 'setdata', json_to_render);

			Resizer.element('#chart_preview');
			$("#chart_preview-top").css("margin", "0 auto");

		}catch(exp){};
	};
	$scope.deleteChart = function (chart) {
		Charts.remove({id: chart._id}, function(err){
			if (err) {
				console.log("Error in deleting chart");
				return err;
			} 
			console.log("Successful delete!");
		});	
	}
}])

// .controller('ChartInstanceCtrl', ['$scope','$state', 'Charts', 'chart', 'clientKey', 'parentScope', '$hideDialog', '_charts', function ($scope, $state,Charts, chart, clientKey, parentScope, $hideDialog, _charts) {

// 	$scope.charts = {};
// 	$scope.charts.imageFormats = ['png','jpg','tiff', 'webp'];
// 	$scope.charts.outputs = [
// 		{name: 'Image',     value: 'img'},
// 		{name: 'PDF',       value: 'pdf'},
// 		{name: 'html5',		value: 'html5'},
// 		{name: 'Not Canvas',value: '!canvas'},
// 		{name: 'Not SVG', 	value: '!svg'},
// 		{name: 'Not VML', 	value: '!vml'}
// 	];
// 	$scope.charts.watermarkTypes = [
// 		{name: 'Light', value: 'light'}, 
// 		{name: 'Dark', value:'dark'}
// 	];
// 	$scope.charts.watermarkPositions = [
// 		{name: 'Top Right', value:'top-right'},
// 		{name:'Top Left', value:'top-left'},
// 		{name:'Bottom Right', value: 'bottom-right'}, 
// 		{name: 'Bottom Left', value:'bottom-left'}
// 	];
// 	$scope.charts.encodings = ['base64', 'binary'];
// 	$scope.chart = angular.copy(chart);

// 	$scope.add = function () {
// 		Charts.save($scope.chart, function(data){
// 			parentScope.charts = data;
// 			$hideDialog();
// 		},
// 		function(error){
// 			console.log(error);
// 			$hideDialog();
// 		});
// 	};

// 	$scope.save = function () {
// 		Charts.update({key: clientKey}, $scope.chart, function(data){
// 			parentScope.charts = data;
// 			$hideDialog();
// 			_charts.push($scope.chart);
// 			var _chart = $scope.chart;
// 			$state.go("client.editor.ide({zingId: '{{_chart.zingId}}'}");
// 		},
// 		function(error) {
// 			console.log(error);
// 			$hideDialog();
// 		});

// };
// $scope.cancel = function () {
// 	$hideDialog();
// };
// }]);





