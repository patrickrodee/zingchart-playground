angular.module('zingClient')

.controller('ChartListCtrl', ['$scope', '$materialDialog', 'Charts','_charts', function($scope, $materialDialog, Charts, _charts){

				var height = $('#sidebar').height() - $('#top-toolbar').height();
				$('#chart_preview').height(height);
				// center rendered chart inner container
		// UNCOMMENT THIS! Had server connection issues so i'm using dummy data for now
		$scope.charts = Charts.query().concat(_charts);


		$scope.aceLoaded = function(_editor) {
			// Editor part
			var _renderer = _editor.renderer;
			var _editSession = _editor.getSession();

			// Options
			_editor.setHighlightActiveLine(false);
			_renderer.hideCursor(true);

			// text window resizing
			var numRows = _editSession.getLength();
			var _min = 0;

			if(numRows < 2 ) {
				_min = 1;
			}
			else if(numRows < 5 ) {
				_min = 3;

			} else {
				_min = 6;

			}

			_editor.setOptions({
					maxLines:_min, 
					minLines:_min,
					fontSize:10
			});	
		};

		$scope.currentChartPreview = 0;
		$scope.renderChart = function (data) {

			console.log(data);
			try {
				var json_to_render = {"data": data};
				zingchart.exec('chart_preview', 'setdata', json_to_render);

				var height = $('#sidebar').height() - $('#top-toolbar').height();
				$('#chart_preview').height(height);

				// center rendered chart inner container
				$("#chart_preview-top").css("margin", "0 auto");

			}catch(exp){};
		};

		$scope.removeChart = function(chart) {

			Charts.remove({id: chart.zingId, key: $scope.client.key, lockCode: chart.lockCode}, function(data){
				$scope.charts = data;
				$scope.alerts.push({
						type: 'success',
						msg: 'Chart Removed Successfully'
				});
			},
			function(err){
				console.log('Error: ' + data);
				$scope.alerts.push({
						type: 'error',
						msg: "Chart was not removed."
				});
			});

		};

		$scope.openChart = function (chart) {

			//chart = chart || {_clientId: $scope.clientId};

			chart = '{"graphset":[]}';
			$materialDialog({
					templateUrl: '/app/charts/views/details.html',
					controller: 'ChartInstanceCtrl',
					locals: {chart:chart, clientKey: $scope.client.key, parentScope: $scope}
			});
		};	

}])

.controller('ChartInstanceCtrl', ['$scope','$state', 'Charts', 'chart', 'clientKey', 'parentScope', '$hideDialog', '_charts', function ($scope, $state,Charts, chart, clientKey, parentScope, $hideDialog, _charts) {

		$scope.charts = {};
		$scope.charts.imageFormats = ['png','jpg','tiff', 'webp'];
		$scope.charts.outputs = [{name: 'Image', value: 'img'},{name: 'PDF', value: 'pdf'},{name:'html5', value: 'html5'},
			{name:'Not Canvas', value:'!canvas'}, {name: 'Not SVG', value: '!svg'}, {name: 'Not VML', value: '!vml'}];
		$scope.charts.watermarkTypes = [{name: 'Light', value: 'light'}, {name: 'Dark', value:'dark'}];
		$scope.charts.watermarkPositions = [{name: 'Top Right', value:'top-right'}, {name:'Top Left', value:'top-left'},
			{name:'Bottom Right', value: 'bottom-right'}, {name: 'Bottom Left', value:'bottom-left'}];
		$scope.charts.encodings = ['base64', 'binary'];
		$scope.chart = angular.copy(chart);

		$scope.add = function () {
			Charts.save($scope.chart, function(data){
				parentScope.charts = data;
				$hideDialog();
			},
			function(error){
				console.log(error);
				$hideDialog();
			});
		};

		$scope.save = function () {
			Charts.update({key: clientKey}, $scope.chart, function(data){
				parentScope.charts = data;
				$hideDialog();
				_charts.push($scope.chart);
				var _chart = $scope.chart;
				$state.go("client.editor.ide({zingId: '{{_chart.zingId}}'}");
			},
			function(error) {
				console.log(error);
				$hideDialog();
			});

		};
		$scope.cancel = function () {
			$hideDialog();
		};
}]);





