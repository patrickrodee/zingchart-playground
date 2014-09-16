(function () {

  angular.module('ui.grid')
    .factory('GridApi', ['$log', '$q', '$rootScope', 'gridUtil', 'uiGridConstants',
      function ($log, $q, $rootScope, gridUtil, uiGridConstants) {
        /**
         * @ngdoc function
         * @name ui.grid.class:GridApi
         * @description GridApi provides the ability to register public methods events inside the grid and allow
         * for other components to use the api via featureName.methodName and featureName.on.eventName(function(args){}
         * @param {object} grid grid that owns api
         */
        var GridApi = function GridApi(grid) {
          this.grid = grid;
          this.listeners = [];
        };

        /**
         * @ngdoc function
         * @name ui.grid.class:suppressEvents
         * @methodOf ui.grid.class:GridApi
         * @description Used to execute a function while disabling the specified event listeners.
         * Disables the listenerFunctions, executes the callbackFn, and then enables
         * the listenerFunctions again
         * @param {object} listenerFuncs listenerFunc or array of listenerFuncs to suppress. These must be the same
         * functions that were used in the .on.eventName method
         * @param {object} callBackFn function to execute
         * @example
         * <pre>
         *    var navigate = function (newRowCol, oldRowCol){
         *       //do something on navigate
         *    }
         *
         *    gridApi.cellNav.on.navigate(scope,navigate);
         *
         *
         *    //call the scrollTo event and suppress our navigate listener
         *    //scrollTo will still raise the event for other listeners
         *    gridApi.suppressEvents(navigate, function(){
         *       gridApi.cellNav.scrollTo(aRow, aCol);
         *    });
         *
         * </pre>
         */
        GridApi.prototype.suppressEvents = function (listenerFuncs, callBackFn) {
          var self = this;
          var listeners = angular.isArray(listenerFuncs) ? listenerFuncs : [listenerFuncs];

          //find all registered listeners
          var foundListeners = [];
          listeners.forEach(function (l) {
            foundListeners = self.listeners.filter(function (lstnr) {
              return l === lstnr.handler;
            });
          });

          //deregister all the listeners
          foundListeners.forEach(function(l){
            l.dereg();
          });

          callBackFn();

          //reregister all the listeners
          foundListeners.forEach(function(l){
              l.dereg = registerEventWithAngular(l.scope, l.eventId, l.handler, self.grid);
          });

        };

        /**
         * @ngdoc function
         * @name registerEvent
         * @methodOf ui.grid.class:GridApi
         * @description Registers a new event for the given feature
         * @param {string} featureName name of the feature that raises the event
         * @param {string} eventName  name of the event
         */
        GridApi.prototype.registerEvent = function (featureName, eventName) {
          var self = this;
          if (!self[featureName]) {
            self[featureName] = {};
          }

          var feature = self[featureName];
          if (!feature.on) {
            feature.on = {};
            feature.raise = {};
          }

          var eventId = self.grid.id + featureName + eventName;

          $log.log('Creating raise event method ' + featureName + '.raise.' + eventName);
          feature.raise[eventName] = function () {
            $rootScope.$broadcast.apply($rootScope, [eventId].concat(Array.prototype.slice.call(arguments)));
          };

          $log.log('Creating on event method ' + featureName + '.on.' + eventName);
          feature.on[eventName] = function (scope, handler) {
            var dereg = registerEventWithAngular(scope, eventId, handler, self.grid);

            //track our listener so we can turn off and on
            var listener = {handler: handler, dereg: dereg, eventId: eventId, scope: scope};
            self.listeners.push(listener);

            //destroy tracking when scope is destroyed
            //wanted to remove the listener from the array but angular does
            //strange things in scope.$destroy so I could not access the listener array
            scope.$on('$destroy', function() {
              listener.dereg = null;
              listener.handler = null;
              listener.eventId = null;
              listener.scope = null;
            });
          };
        };

        function registerEventWithAngular(scope, eventId, handler, grid) {
          return scope.$on(eventId, function (event) {
            var args = Array.prototype.slice.call(arguments);
            args.splice(0, 1); //remove evt argument
            handler.apply(grid.api, args);
          });
        }

        /**
         * @ngdoc function
         * @name registerEventsFromObject
         * @methodOf ui.grid.class:GridApi
         * @description Registers features and events from a simple objectMap.
         * eventObjectMap must be in this format (multiple features allowed)
         * <pre>
         * {featureName:
         *        {
         *          eventNameOne:function(args){},
         *          eventNameTwo:function(args){}
         *        }
         *  }
         * </pre>
         * @param {object} eventObjectMap map of feature/event names
         */
        GridApi.prototype.registerEventsFromObject = function (eventObjectMap) {
          var self = this;
          var features = [];
          angular.forEach(eventObjectMap, function (featProp, featPropName) {
            var feature = {name: featPropName, events: []};
            angular.forEach(featProp, function (prop, propName) {
              feature.events.push(propName);
            });
            features.push(feature);
          });

          features.forEach(function (feature) {
            feature.events.forEach(function (event) {
              self.registerEvent(feature.name, event);
            });
          });

        };

        /**
         * @ngdoc function
         * @name registerMethod
         * @methodOf ui.grid.class:GridApi
         * @description Registers a new event for the given feature
         * @param {string} featureName name of the feature
         * @param {string} methodName  name of the method
         * @param {object} callBackFn function to execute
         */
        GridApi.prototype.registerMethod = function (featureName, methodName, callBackFn) {
          if (!this[featureName]) {
            this[featureName] = {};
          }

          var feature = this[featureName];
          feature[methodName] = callBackFn;

        };

        /**
         * @ngdoc function
         * @name registerMethodsFromObject
         * @methodOf ui.grid.class:GridApi
         * @description Registers features and methods from a simple objectMap.
         * eventObjectMap must be in this format (multiple features allowed)
         * <br>
         * {featureName:
         *        {
         *          methodNameOne:function(args){},
         *          methodNameTwo:function(args){}
         *        }
         * @param {object} eventObjectMap map of feature/event names
         */
        GridApi.prototype.registerMethodsFromObject = function (methodMap) {
          var self = this;
          var features = [];
          angular.forEach(methodMap, function (featProp, featPropName) {
            var feature = {name: featPropName, methods: []};
            angular.forEach(featProp, function (prop, propName) {
              feature.methods.push({name: propName, fn: prop});
            });
            features.push(feature);
          });

          features.forEach(function (feature) {
            feature.methods.forEach(function (method) {
              self.registerMethod(feature.name, method.name, method.fn);
            });
          });

        };

        return GridApi;

      }]);

})();