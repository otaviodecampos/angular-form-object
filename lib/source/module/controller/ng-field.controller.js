(function() {

    angular.module('formoc')
        .controller('NgFieldCtrl', Controller);

    function Controller($scope, $timeout, NgObject, TEMPLATE) {

        $scope.tpl = TEMPLATE[typeof $scope.value];

        $scope.$ngField = {
            path: $scope.path ? [$scope.path, $scope.key].join('.') : $scope.key
        };

        $scope.String = String;

        $scope.moveUp = function() {
            move(-1);
        }

        $scope.moveDown = function() {
            move(1);
        }

        $scope.delete = function() {
            if(isArray()) {
                $scope.model.splice($scope.key, 1);
            } else {
                delete $scope.model[$scope.key];
            }
        }

        this.setValue = function(value, tpl) {
            $scope.tpl = tpl || TEMPLATE[typeof value];
            $scope.$on('$includeContentLoaded', function() {
                $scope.model[$scope.key] = value;
            });
        }

        $scope.isArray = isArray;
        function isArray(value) {
            return angular.isArray(value || $scope.model);
        }

        function move (factor) {
            var index, value;
            if(isArray()) {
                NgObject.reorderArray($scope.model, $scope.key, factor);
            } else {
                index = Object.keys($scope.model).indexOf($scope.key);
                NgObject.reorder($scope.model, $scope.key, {index: index, factor: factor});

                // Force the ng-repeat to reflect sorting by attributes
                value = $scope.model[$scope.key];
                $scope.model[$scope.key] = typeof(value) == 'object' ? angular.copy(value) : undefined;
                $timeout(function() {
                    $scope.model[$scope.key] = value;
                });
            }
        }

    }

})();
