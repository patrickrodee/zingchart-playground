(function(){
  'use strict';

  angular.module('ui.grid').directive('uiGridRow', ['$log', function($log) {
    return {
      replace: true,
      // priority: 2001,
      // templateUrl: 'ui-grid/ui-grid-row',
      require: ['^uiGrid', '^uiGridRenderContainer'],
      scope: {
         row: '=uiGridRow'
         //rowIndex: '='
      },
      compile: function() {
        return {
          pre: function($scope, $elm, $attrs, controllers) {
            var uiGridCtrl = controllers[0];
            var containerCtrl = controllers[1];

            var grid = uiGridCtrl.grid;

            $scope.grid = uiGridCtrl.grid;
            $scope.colContainer = containerCtrl.colContainer;

            grid.getRowTemplateFn.then(function (templateFn) {
              templateFn($scope, function(clonedElement, scope) {
                $elm.replaceWith(clonedElement);
              });
            });
          },
          post: function($scope, $elm, $attrs, controllers) {
            var uiGridCtrl = controllers[0];
            var containerCtrl = controllers[1];

            //add optional reference to externalScopes function to scope
            //so it can be retrieved in lower elements
            $scope.getExternalScopes = uiGridCtrl.getExternalScopes;
            $scope.getCellValue = uiGridCtrl.getCellValue;
          }
        };
      }
    };
  }]);

})();