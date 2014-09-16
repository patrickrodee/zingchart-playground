angular.module('ui.grid').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui-grid/ui-grid-body',
    "<div class=\"ui-grid-body\"><div class=\"ui-grid-scrollbar-box\"><div ui-grid-viewport class=\"ui-grid-viewport\"><div class=\"ui-grid-canvas\"><div ng-repeat=\"row in grid.renderedRows track by $index\" class=\"ui-grid-row\" ng-style=\"rowStyle($index)\"><div ui-grid-row=\"row\" row-index=\"row.index\"></div></div></div></div></div><!-- native scrolling --><div ui-grid-native-scrollbar ng-if=\"!grid.options.enableVirtualScrolling && grid.options.enableNativeScrolling\" type=\"vertical\"></div><div ui-grid-native-scrollbar ng-if=\"!grid.options.enableVirtualScrolling && grid.options.enableNativeScrolling\" type=\"horizontal\"></div><!-- virtual scrolling --><div ui-grid-scrollbar ng-if=\"grid.options.enableVirtualScrolling\" type=\"vertical\" scrolling-class=\"ui-grid-scrolling\"></div><div ui-grid-scrollbar ng-if=\"grid.options.enableVirtualScrolling\" type=\"horizontal\" scrolling-class=\"ui-grid-scrolling\"></div><div ng-transclude></div></div>"
  );


  $templateCache.put('ui-grid/ui-grid-group-panel',
    "<div class=\"ui-grid-group-panel\"><div ui-t=\"groupPanel.description\" class=\"description\" ng-show=\"groupings.length == 0\"></div><ul ng-show=\"groupings.length > 0\" class=\"ngGroupList\"><li class=\"ngGroupItem\" ng-repeat=\"group in configGroups\"><span class=\"ngGroupElement\"><span class=\"ngGroupName\">{{group.displayName}} <span ng-click=\"removeGroup($index)\" class=\"ngRemoveGroup\">x</span></span> <span ng-hide=\"$last\" class=\"ngGroupArrow\"></span></span></li></ul></div>"
  );


  $templateCache.put('ui-grid/ui-grid-header',
    "<div class=\"ui-grid-top-panel\"><div ui-grid-group-panel ng-show=\"grid.options.showGroupPanel\"></div><div class=\"ui-grid-header ui-grid-header-viewport\"><div class=\"ui-grid-header-canvas\"><div ng-repeat=\"col in colContainer.renderedColumns track by col.colDef.name\" ui-grid-header-cell col=\"col\" render-index=\"$index\" ng-style=\"$index === 0 && colContainer.columnStyle($index)\"></div></div></div><div ui-grid-menu></div></div>"
  );


  $templateCache.put('ui-grid/ui-grid-row',
    "<div ng-repeat=\"col in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ui-grid-cell></div>"
  );


  $templateCache.put('ui-grid/ui-grid-scrollbar',
    "<div class=\"ui-grid-scrollbar\" ng-show=\"showScrollbar()\"></div>"
  );


  $templateCache.put('ui-grid/ui-grid',
    "<div ui-i18n=\"en\" class=\"ui-grid\"><!-- TODO (c0bra): add \"scoped\" attr here, eventually? --><style ui-grid-style>.grid{{ grid.id }} {\n" +
    "      /* Styles for the grid */\n" +
    "    }\n" +
    "\n" +
    "    .grid{{ grid.id }} .ui-grid-row, .grid{{ grid.id }} .ui-grid-cell, .grid{{ grid.id }} .ui-grid-cell .ui-grid-vertical-bar {\n" +
    "      height: {{ grid.options.rowHeight }}px;\n" +
    "    }\n" +
    "\n" +
    "    .grid{{ grid.id }} .ui-grid-row:last-child .ui-grid-cell {\n" +
    "      border-bottom-width: {{ ((grid.getTotalRowHeight() < grid.getViewportHeight()) && '1') || '0' }}px;\n" +
    "    }\n" +
    "\n" +
    "    {{ grid.verticalScrollbarStyles }}\n" +
    "    {{ grid.horizontalScrollbarStyles }}\n" +
    "\n" +
    "    /*{{ grid.nativeVerticalScrollbarStyles }}\n" +
    "    {{ grid.nativeHorizontalScrollbarStyles }}*/\n" +
    "\n" +
    "    .grid{{ grid.id }} .ui-grid-native-scrollbar.vertical {\n" +
    "      height: {{ grid.getViewportHeight() }}px;\n" +
    "    }\n" +
    "\n" +
    "    .ui-grid[dir=rtl] .ui-grid-viewport {\n" +
    "      padding-left: {{ grid.verticalScrollbarWidth }}px;\n" +
    "    }\n" +
    "\n" +
    "    {{ grid.customStyles }}</style><div ui-grid-render-container container-id=\"'body'\" col-container-name=\"'body'\" row-container-name=\"'body'\" bind-scroll-horizontal=\"true\" bind-scroll-vertical=\"true\" enable-scrollbars=\"true\"></div><div ui-grid-footer></div><div ui-grid-column-menu ng-if=\"grid.options.enableColumnMenu\"></div><div ng-transclude></div></div>"
  );


  $templateCache.put('ui-grid/uiGridCell',
    "<div class=\"ui-grid-cell-contents\">{{COL_FIELD CUSTOM_FILTERS}}</div>"
  );


  $templateCache.put('ui-grid/uiGridColumnFilter',
    "<li class=\"ui-grid-menu-item ui-grid-clearfix ui-grid-column-filter\" ng-show=\"itemShown()\" ng-click=\"$event.stopPropagation();\"><div class=\"input-container\"><input class=\"column-filter-input\" type=\"text\" ng-model=\"item.model\" placeholder=\"{{ i18n.search.placeholder }}\"><div class=\"column-filter-cancel-icon-container\"><i class=\"ui-grid-filter-cancel ui-grid-icon-cancel column-filter-cancel-icon\">&nbsp;</i></div></div><div style=\"button-container\" ng-click=\"item.action($event)\"><div class=\"ui-grid-button\"><i class=\"ui-grid-icon-search\">&nbsp;</i></div></div></li>"
  );


  $templateCache.put('ui-grid/uiGridColumnMenu',
    "<div class=\"ui-grid-column-menu\"><div ui-grid-menu menu-items=\"menuItems\"><!-- <div class=\"ui-grid-column-menu\">\n" +
    "    <div class=\"inner\" ng-show=\"menuShown\">\n" +
    "      <ul>\n" +
    "        <div ng-show=\"grid.options.enableSorting\">\n" +
    "          <li ng-click=\"sortColumn($event, asc)\" ng-class=\"{ 'selected' : col.sort.direction == asc }\"><i class=\"ui-grid-icon-sort-alt-up\"></i> Sort Ascending</li>\n" +
    "          <li ng-click=\"sortColumn($event, desc)\" ng-class=\"{ 'selected' : col.sort.direction == desc }\"><i class=\"ui-grid-icon-sort-alt-down\"></i> Sort Descending</li>\n" +
    "          <li ng-show=\"col.sort.direction\" ng-click=\"unsortColumn()\"><i class=\"ui-grid-icon-cancel\"></i> Remove Sort</li>\n" +
    "        </div>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div> --></div></div>"
  );


  $templateCache.put('ui-grid/uiGridHeaderCell',
    "<div class=\"ui-grid-header-cell clearfix\" ng-class=\"{ 'sortable': sortable }\"><div class=\"ui-grid-vertical-bar\">&nbsp;</div><div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\">{{ col.displayName }} <span ui-grid-visible=\"col.sort.direction\" ng-class=\"{ 'ui-grid-icon-up-dir': col.sort.direction == asc, 'ui-grid-icon-down-dir': col.sort.direction == desc, 'ui-grid-icon-blank': !col.sort.direction }\">&nbsp;</span></div><div ng-if=\"grid.options.enableColumnMenu\" class=\"ui-grid-column-menu-button\" ng-click=\"toggleMenu($event)\"><i class=\"ui-grid-icon-angle-down\">&nbsp;<i></i></i></div><div ng-if=\"filterable\" class=\"ui-grid-filter-container\"><input type=\"text\" class=\"ui-grid-filter-input\" ng-model=\"col.filter.term\" ng-click=\"$event.stopPropagation()\"><div class=\"ui-grid-filter-button\" ng-click=\"col.filter.term = null\"><i class=\"ui-grid-icon-cancel right\" ng-show=\"!!col.filter.term\">&nbsp;</i> <!-- use !! because angular interprets 'f' as false --></div></div></div>"
  );


  $templateCache.put('ui-grid/uiGridMenu',
    "<div class=\"ui-grid-menu\"><div class=\"ui-grid-menu-inner\" ng-show=\"shown\"><ul class=\"ui-grid-menu-items\"><li ng-repeat=\"item in menuItems\" ui-grid-menu-item action=\"item.action\" title=\"item.title\" active=\"item.active\" icon=\"item.icon\" shown=\"item.shown\" context=\"item.context\" template-url=\"item.templateUrl\"></li></ul></div></div>"
  );


  $templateCache.put('ui-grid/uiGridMenuItem',
    "<li class=\"ui-grid-menu-item\" ng-click=\"itemAction($event)\" ng-show=\"itemShown()\" ng-class=\"{ 'ui-grid-menu-item-active' : active() }\"><i ng-class=\"icon\"></i> {{ title }}</li>"
  );


  $templateCache.put('ui-grid/uiGridRenderContainer',
    "<div class=\"ui-grid-render-container\"><div ui-grid-header></div><div ui-grid-viewport></div><!-- <div ui-grid-render-canvas class=\"ui-grid-canvas\">\n" +
    "      <div ng-repeat=\"row in container.visibleRowCache track by $index\" class=\"ui-grid-row\">\n" +
    "        <div ui-grid-row=\"row\" row-index=\"row.index\" render-container=\"container\"></div>\n" +
    "      </div>\n" +
    "    </div> --><!-- native scrolling --><div ui-grid-native-scrollbar ng-if=\"!grid.options.enableVirtualScrolling && grid.options.enableNativeScrolling && enableScrollbars\" type=\"vertical\"></div><div ui-grid-native-scrollbar ng-if=\"!grid.options.enableVirtualScrolling && grid.options.enableNativeScrolling && enableScrollbars\" type=\"horizontal\"></div></div>"
  );


  $templateCache.put('ui-grid/uiGridViewport',
    "<div class=\"ui-grid-viewport\"><div class=\"ui-grid-canvas\"><div ng-repeat=\"row in rowContainer.renderedRows track by row.index\" class=\"ui-grid-row\" ng-style=\"rowContainer.rowStyle($index)\"><div ui-grid-row=\"row\"></div></div></div></div>"
  );


  $templateCache.put('ui-grid/cellBooleanEditor',
    "<div><input type=\"checkbox\" class=\"ui-grid-edit-checkbox\" ng-class=\"'colt' + col.index\" ui-grid-text-editor ng-model=\"COL_FIELD\"></div>"
  );


  $templateCache.put('ui-grid/cellTextEditor',
    "<div><input ng-class=\"'colt' + col.index\" ui-grid-text-editor ng-model=\"COL_FIELD\"></div>"
  );


  $templateCache.put('ui-grid/columnResizer',
    "<div ui-grid-column-resizer ng-if=\"grid.options.enableColumnResizing\" class=\"ui-grid-column-resizer\" col=\"col\" position=\"right\" render-index=\"renderIndex\"></div>"
  );

}]);
