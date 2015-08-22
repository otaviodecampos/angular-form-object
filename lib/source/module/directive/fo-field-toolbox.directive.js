(function() {
    'use strict'

    angular.module('formobject')
        .directive('foFieldToolbox', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'formobject/fo-field-toolbox.tpl.html',
            replace: true
        }
    }
})();
