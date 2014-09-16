angular.module('zingClient')

    .factory('Groups', ['$resource', function($resource) {
        return $resource('/api/group/:id', {id : "@_id"},
            {
                'update': {method: 'PUT', isArray:true},
                'get':    {method:'GET'},
                'save':   {method:'POST', isArray:true},
                'query':  {method:'GET', isArray:true},
                'remove': {method:'DELETE', isArray:true}
            });
    }]);