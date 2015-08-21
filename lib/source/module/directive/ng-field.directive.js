(function() {
    'use strict'

    angular.module('formoc')
        .directive('ngField', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'ngObject/ng-field.tpl.html',
            replace: true,
            controller: 'NgFieldCtrl as fieldCtrl'
        }
    }
})();
