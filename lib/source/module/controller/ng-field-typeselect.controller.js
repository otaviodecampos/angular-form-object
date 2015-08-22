(function() {

    angular.module('formoc')
        .controller('NgFieldTypeCtrl', Controller);

    function Controller($scope, TEMPLATE) {

        this.types = Object.keys(TEMPLATE);

        $scope.String = String;

        if($scope.model[$scope.key] == null || $scope.model[$scope.key] == undefined) {
            this.type = String($scope.model[$scope.key]);
        } else if(angular.isArray($scope.model[$scope.key])) {
            this.type = 'array';
        } else {
            this.type = typeof $scope.model[$scope.key];
        }

        this.set = function(newType) {
            var value = $scope.model[$scope.key]
                , tpl = TEMPLATE[newType]
                , cast = this.type != 'object'

            if(newType == 'array') {
                value = [value];
                if(!cast) {
                    value = [];
                }
            } else if(newType == 'null') {
                value = null;
            } else if(newType == 'undefined') {
                value = undefined;
            } else if(newType == 'object') {
                value = {};
            } else {
                if(!cast) {
                   value = '';
                }
                value = window[newType.charAt(0).toUpperCase() + newType.slice(1)](value);
            }

            $scope.setValue(value, tpl);
        }

    }

})();
