(function(){
// 'use strict';

  angular.module('ui.grid').directive('uiGridNativeScrollbar', ['$log', '$timeout', '$document', 'uiGridConstants', 'gridUtil', function($log, $timeout, $document, uiGridConstants, gridUtil) {
    var scrollBarWidth = gridUtil.getScrollbarWidth();
    scrollBarWidth = scrollBarWidth > 0 ? scrollBarWidth : 17;

    return {
      scope: {
        type: '@'
      },
      require: ['^uiGrid', '^uiGridRenderContainer'],
      link: function ($scope, $elm, $attrs, controllers) {
        var uiGridCtrl = controllers[0];
        var containerCtrl = controllers[1];
        var rowContainer = containerCtrl.rowContainer;
        var colContainer = containerCtrl.colContainer;
        var grid = uiGridCtrl.grid;

        var contents = angular.element('<div class="contents">&nbsp;</div>');

        $elm.addClass('ui-grid-native-scrollbar');

        var previousScrollPosition;

        var elmMaxScroll = 0;

        if ($scope.type === 'vertical') {
          // Update the width based on native scrollbar width
          $elm.css('width', scrollBarWidth + 'px');

          $elm.addClass('vertical');

          grid.verticalScrollbarWidth = scrollBarWidth;
          colContainer.verticalScrollbarWidth = scrollBarWidth;

          // Save the initial scroll position for use in scroll events
          previousScrollPosition = $elm[0].scrollTop;
        }
        else if ($scope.type === 'horizontal') {
          // Update the height based on native scrollbar height
          $elm.css('height', scrollBarWidth + 'px');

          $elm.addClass('horizontal');

          // Save this scrollbar's dimension in the grid properties
          grid.horizontalScrollbarHeight = scrollBarWidth;
          rowContainer.horizontalScrollbarHeight = scrollBarWidth;

          // Save the initial scroll position for use in scroll events
          previousScrollPosition = gridUtil.normalizeScrollLeft($elm);
        }

        // Save the contents elm inside the scrollbar elm so it sizes correctly
        $elm.append(contents);

        // Get the relevant element dimension now that the contents are in it
        if ($scope.type === 'vertical') {
          elmMaxScroll = gridUtil.elementHeight($elm);
        }
        else if ($scope.type === 'horizontal') {
          elmMaxScroll = gridUtil.elementWidth($elm);
        }
        
        function updateNativeVerticalScrollbar() {
          // Update the vertical scrollbar's content height so it's the same as the canvas
          var h = rowContainer.getCanvasHeight();

          // TODO(c0bra): set scrollbar `top` by height of header row
          // var headerHeight = gridUtil.outerElementHeight(containerCtrl.header);
          var headerHeight = grid.headerHeight;

          // $log.debug('headerHeight in scrollbar', headerHeight);

          // var ret = '.grid' + uiGridCtrl.grid.id + ' .ui-grid-native-scrollbar.vertical .contents { height: ' + h + 'px; }';
          var ret = '.grid' + grid.id + ' .ui-grid-render-container-' + containerCtrl.containerId + ' .ui-grid-native-scrollbar.vertical .contents { height: ' + h + 'px; }';
          ret += '\n .grid' + grid.id + ' .ui-grid-render-container-' + containerCtrl.containerId + ' .ui-grid-native-scrollbar.vertical { top: ' + headerHeight + 'px}';

          elmMaxScroll = h;

          return ret;
        }

        // Get the grid's bottom border height (TODO(c0bra): need to account for footer here!)
        var gridElm = gridUtil.closestElm($elm, '.ui-grid');
        var gridBottomBorder = gridUtil.getBorderSize(gridElm, 'bottom');

        function updateNativeHorizontalScrollbar() {
          var w = colContainer.getCanvasWidth();

          // Scrollbar needs to be negatively positioned beyond the bottom of the relatively-positioned render container
          var bottom = (scrollBarWidth * -1) + gridBottomBorder;

          var ret = '.grid' + grid.id + ' .ui-grid-render-container-' + containerCtrl.containerId + ' .ui-grid-native-scrollbar.horizontal { bottom: ' + bottom + 'px; }';
          ret += '.grid' + grid.id + ' .ui-grid-render-container-' + containerCtrl.containerId + ' .ui-grid-native-scrollbar.horizontal .contents { width: ' + w + 'px; }';

          elmMaxScroll = w;

          return ret;
        }

        // NOTE: priority 6 so they run after the column widths update, which in turn update the canvas width
        if (grid.options.enableNativeScrolling) {
          if ($scope.type === 'vertical') {
            grid.registerStyleComputation({
              priority: 6,
              func: updateNativeVerticalScrollbar
            });
          }
          else if ($scope.type === 'horizontal') {
            grid.registerStyleComputation({
              priority: 6,
              func: updateNativeHorizontalScrollbar
            });
          }
        }

        $scope.scrollSource = null;

        function scrollEvent(evt) {
          if ($scope.type === 'vertical') {
            var newScrollTop = $elm[0].scrollTop;

            var yDiff = previousScrollPosition - newScrollTop;

            var vertScrollLength = (rowContainer.getCanvasHeight() - rowContainer.getViewportHeight());

            // Subtract the h. scrollbar height from the vertical length if it's present
            if (grid.horizontalScrollbarHeight && grid.horizontalScrollbarHeight > 0) {
              vertScrollLength = vertScrollLength - uiGridCtrl.grid.horizontalScrollbarHeight;
            }

            var vertScrollPercentage = newScrollTop / vertScrollLength;

            if (vertScrollPercentage > 1) { vertScrollPercentage = 1; }
            if (vertScrollPercentage < 0) { vertScrollPercentage = 0; }

            var yArgs = {
              target: $elm,
              y: {
                percentage: vertScrollPercentage
              }
            };
            
            // If the source of this scroll is defined (i.e., not us, then don't fire the scroll event because we'll be re-triggering)
            if (!$scope.scrollSource) {
              uiGridCtrl.fireScrollingEvent(yArgs);
            }
            else {
              // Reset the scroll source for the next scroll event
              $scope.scrollSource = null;
            }

            previousScrollPosition = newScrollTop;
          }
          else if ($scope.type === 'horizontal') {
            // var newScrollLeft = $elm[0].scrollLeft;
            var newScrollLeft = gridUtil.normalizeScrollLeft($elm);

            var xDiff = previousScrollPosition - newScrollLeft;

            var horizScrollLength = (colContainer.getCanvasWidth() - colContainer.getViewportWidth());
            var horizScrollPercentage = newScrollLeft / horizScrollLength;

            var xArgs = {
              target: $elm,
              x: {
                percentage: horizScrollPercentage
              }
            };
            
            // If the source of this scroll is defined (i.e., not us, then don't fire the scroll event because we'll be re-triggering)
            if (!$scope.scrollSource) {
              uiGridCtrl.fireScrollingEvent(xArgs);
            }
            else {
              // Reset the scroll source for the next scroll event
              $scope.scrollSource = null;
            }

            previousScrollPosition = newScrollLeft;
          }
        }

        $elm.on('scroll', scrollEvent);

        $elm.on('$destroy', function() {
          $elm.off('scroll');
        });

        function gridScroll(evt, args) {
          // Don't listen to our own scroll event!
          if (args.target && (args.target === $elm || args.target.hasClass('ui-grid-native-scrollbar'))) {
            return;
          }

          // Set the source of the scroll event in our scope so it's available in our 'scroll' event handler
          $scope.scrollSource = args.target;

          if ($scope.type === 'vertical') {
            if (args.y && typeof(args.y.percentage) !== 'undefined' && args.y.percentage !== undefined) {
              var vertScrollLength = (rowContainer.getCanvasHeight() - rowContainer.getViewportHeight());

              var newScrollTop = Math.max(0, args.y.percentage * vertScrollLength);
              
              $elm[0].scrollTop = newScrollTop;
            }
          }
          else if ($scope.type === 'horizontal') {
            if (args.x && typeof(args.x.percentage) !== 'undefined' && args.x.percentage !== undefined) {
              var horizScrollLength = (colContainer.getCanvasWidth() - colContainer.getViewportWidth());

              var newScrollLeft = Math.max(0, args.x.percentage * horizScrollLength);
              
              // $elm[0].scrollLeft = newScrollLeft;
              $elm[0].scrollLeft = gridUtil.denormalizeScrollLeft($elm, newScrollLeft);
            }
          }
        }

        var gridScrollDereg = $scope.$on(uiGridConstants.events.GRID_SCROLL, gridScroll);
        $scope.$on('$destroy', gridScrollDereg);
      }
    };
  }]);
})();