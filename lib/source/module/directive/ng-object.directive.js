(function() {
    'use strict'

    angular.module('formoc')
        .directive('ngObject', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'ngObject/ng-object.tpl.html',
            scope: {
                model: "=",
                path: "="
            },
            controller: 'NgObjectCtrl as objCtrl',
            replace: true
        }
    }
})();
