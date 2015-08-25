(function() {

    angular.module('formobject')
        .controller('NgObjectCtrl', Controller);

    function Controller($scope) {

        $scope.$ngObject = {
            array: isArray()
        };

        $scope.add = function () {
            if(isArray()) {
                $scope.model.push('');
            } else {
                $scope.model['new ' + (Object.keys($scope.model).length + 1)] = '';
            }

        }

        function isArray() {
            return angular.isArray($scope.model);
        }

    }

})();
