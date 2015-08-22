(function() {
    'use strict'

    angular.module('formobject')
        .directive('foFieldTypeselect', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'formobject/fo-field-typeselect.tpl.html',
            replace: true,
            controller: 'NgFieldTypeCtrl as typeCtrl'
        }
    }
})();
