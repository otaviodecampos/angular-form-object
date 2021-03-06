(function() {
    'use strict'

    angular.module('formobject')
        .directive('ngObject', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'formobject/fo-object.tpl.html',
            scope: {
                model: "=",
                path: "=",
                formHorizontal: "=",
                formNoEditableKey: "="
            },
            controller: 'NgObjectCtrl as objCtrl',
            replace: true,
            link: function(scope) {
                if(scope.formHorizontal == undefined) {
                    scope.formHorizontal = true;
                }
            }
        }
    }
})();
