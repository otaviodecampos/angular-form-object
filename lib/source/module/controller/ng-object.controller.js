(function() {

    angular.module('ngObject')
        .controller('NgObjectCtrl', Controller);

    function Controller($scope) {

        $scope.$ngObject = {
            array: isArray()
        };

        $scope.add = function () {
            if(isArray()) {
                $scope.model.push('');
            } else {
                var name = 'new ' + Object.keys($scope.model).length;
                $scope.model[name] = '';
            }

        }

        function isArray() {
            return angular.isArray($scope.model);
        }

    }

})();