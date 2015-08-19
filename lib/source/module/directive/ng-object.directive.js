(function() {
    'use strict'

    angular.module('ngObject')
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