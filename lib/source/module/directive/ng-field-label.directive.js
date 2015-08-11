(function() {
    'use strict'

    angular.module('ngObject')
        .directive('ngFieldLabel', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'ngObject/ng-field-label.tpl.html',
            replace: true,
            controller: 'NgFieldLabelCtrl as fieldLabelCtrl'
        }
    }
})();