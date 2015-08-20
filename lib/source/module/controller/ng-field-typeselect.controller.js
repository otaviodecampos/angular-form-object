(function() {

    angular.module('ngObject')
        .controller('NgFieldTypeCtrl', Controller);

    function Controller($scope, TEMPLATE) {

        this.types = Object.keys(TEMPLATE);
        this.type = this.types[this.types.indexOf(typeof $scope.model[$scope.key])];

        this.set = function(type) {
            var value
                , tpl = TEMPLATE[type];

            if(type == 'array') {
                value = [];
                tpl = TEMPLATE['object'];
            } else if(type == 'null') {
                value = null;
            } else if(type == 'undefined') {
                value = undefined;
            } else if(type == 'object') {
                value = {};
            } else {
                value = window[type.charAt(0).toUpperCase() + type.slice(1)]($scope.model[$scope.key]);
            }
            $scope.fieldCtrl.setValue(value, tpl);
        }

    }

})();