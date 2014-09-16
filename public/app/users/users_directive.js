angular.module('zingClient')

    .directive('zingUserList', function() {
        return {
            restrict: 'E',
            templateUrl: '/app/users/views/list.html',
            controller: 'UserListCtrl'
        };
    });