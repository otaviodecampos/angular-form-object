(function() {

    angular.module('ngObject')
        .controller('NgFieldCtrl', Controller);

    function Controller($scope) {

        var template = {
            object: 'ngObject/ng-field-object.tpl.html',
            array: 'ngObject/ng-field-array.tpl.html',
            string: 'ngObject/ng-field-string.tpl.html',
            boolean: 'ngObject/ng-field-boolean.tpl.html',
            number: 'ngObject/ng-field-number.tpl.html'
        }

        $scope.templateOf = function(value) {
            console.log(value);
            return template[angular.isArray(value) ? 'array' : typeof value];
        };

        $scope.indexOf = function(value, obj) {
            return obj.indexOf(value);
        }

    }

})();