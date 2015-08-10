(function() {
    'use strict'

    angular.module('ngObject')
        .directive('ngObject', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'ngObject/ng-object.tpl.html',
            scope: {
                model: "="
            },
            controller: 'NgObjectCtrl as objCtrl',
            replace: true
        }
    }
})();