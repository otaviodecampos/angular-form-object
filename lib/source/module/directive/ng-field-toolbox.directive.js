(function() {
    'use strict'

    angular.module('formoc')
        .directive('ngFieldToolbox', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'ngObject/ng-field-toolbox.tpl.html',
            replace: true
        }
    }
})();
