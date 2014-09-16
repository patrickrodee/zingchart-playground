angular.module('zingClient')

    .directive('zingGroupList', function() {
        return {
            restrict: 'E',
            templateUrl: '/app/groups/views/list.html',
            controller: 'GroupListCtrl'
        };
    });