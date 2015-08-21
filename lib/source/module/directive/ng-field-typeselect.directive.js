(function() {
    'use strict'

    angular.module('formoc')
        .directive('ngFieldTypeselect', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'ngObject/ng-field-typeselect.tpl.html',
            replace: true,
            controller: 'NgFieldTypeCtrl as typeCtrl'
        }
    }
})();
