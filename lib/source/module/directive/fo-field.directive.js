(function() {
    'use strict'

    angular.module('formobject')
        .directive('foField', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'formobject/fo-field.tpl.html',
            replace: true,
            controller: 'FoFieldCtrl as fieldCtrl'
        }
    }
})();
