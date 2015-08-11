(function() {

    angular.module('ngObject')
        .controller('NgFieldCtrl', Controller);

    function Controller($scope, $timeout, NgObject) {

        $scope.$ngField = {};

        var template = {
            object: 'ngObject/ng-field-object.tpl.html',
            array: 'ngObject/ng-field-array.tpl.html',
            string: 'ngObject/ng-field-string.tpl.html',
            boolean: 'ngObject/ng-field-boolean.tpl.html',
            number: 'ngObject/ng-field-number.tpl.html'
        }

        $scope.templateOf = function(value) {
            return template[isArray(value) ? 'array' : typeof value];
        };

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

                // When the order of the keys change, and the key value is primitive,
                // ng-repeat is not updated because the track by.
                value = $scope.model[$scope.key];
                if(!isArray() && typeof value != 'object') {
                    $scope.model[$scope.key] = undefined;
                    $timeout(function() {
                        $scope.model[$scope.key] = value;
                    });
                }
            }
        }

    }

})();