(function() {

    angular.module('formoc')
        .controller('NgFieldKeyCtrl', Controller);

    function Controller($scope, $element, $timeout, NgObject) {

        var $ngField = $scope.$ngField[$scope.key] = {};

        this.allow = !angular.isArray($scope.model);

        this.accept = function () {
            if ($scope.key != $ngField.key) {
                var index = Object.keys($scope.model).indexOf($scope.key);
                NgObject.reorder($scope.model, $ngField.key, {index: index});
            }
        }

        this.discard = function () {
            $ngField.input = false
        }

        this.input = function () {
            $ngField.key = $scope.key;
            $ngField.input = true;
            $timeout(function() {
                $element.find('input').focus();
            });
        }

        this.keyup = function($event) {
            if($event.keyCode == 13) {
                this.accept();
            } else if ($event.keyCode == 27) {
                this.discard();
            } else {
                angular.noop()
            }
        }

    }

})();
