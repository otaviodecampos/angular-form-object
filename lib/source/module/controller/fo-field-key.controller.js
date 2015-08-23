(function() {

    angular.module('formobject')
        .controller('NgFieldKeyCtrl', Controller);

    function Controller($scope, $element, $timeout, NgObject) {

        var $foField = $scope.$foField;

        this.allow = !angular.isArray($scope.model);
        console.log(this.allow);
        this.accept = function () {
            if ($scope.key != $foField.key) {
                var index = Object.keys($scope.model).indexOf($scope.key);
                NgObject.reorder($scope.model, $foField.key, {index: index});
            }
        }

        this.discard = function () {
            $foField.input = false
        }

        this.input = function () {
            $foField.key = $scope.key;
            $foField.input = true;
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
