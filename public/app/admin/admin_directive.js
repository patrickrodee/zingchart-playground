angular.module('zingClient')

    .directive('zingAdminNav', function(){
        return {
            restrict: 'E',
            scope: {
               current: '=current'
            },
            templateUrl: '/app/admin/views/sidenav.html',
            controller: function($scope) {
            }
        };
    });