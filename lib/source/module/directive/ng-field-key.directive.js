(function() {
    'use strict'

    angular.module('ngObject')
        .directive('ngFieldKey', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'ngObject/ng-field-key.tpl.html',
            replace: true,
            controller: 'NgFieldKeyCtrl as fieldKeyCtrl'
        }
    }
})();