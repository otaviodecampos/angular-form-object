(function() {
    'use strict'

    angular.module('formobject')
        .directive('foFieldKey', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'formobject/fo-field-key.tpl.html',
            replace: true,
            controller: 'NgFieldKeyCtrl as fieldKeyCtrl'
        }
    }
})();
