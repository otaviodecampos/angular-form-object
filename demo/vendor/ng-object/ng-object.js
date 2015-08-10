(function() {
    'use strict'

    angular.module('ngObject', [
        

    ]);

})();

(function() {

    angular.module('ngObject')
        .controller('NgFieldCtrl', Controller);

    function Controller($scope) {

        var template = {
            object: 'ngObject/ng-field-object.tpl.html',
            array: 'ngObject/ng-field-array.tpl.html',
            string: 'ngObject/ng-field-string.tpl.html',
            boolean: 'ngObject/ng-field-boolean.tpl.html',
            number: 'ngObject/ng-field-number.tpl.html'
        }

        $scope.templateOf = function(value) {
            console.log(value);
            return template[angular.isArray(value) ? 'array' : typeof value];
        };

        $scope.indexOf = function(value, obj) {
            return obj.indexOf(value);
        }

    }

})();
(function() {

    angular.module('ngObject')
        .controller('NgObjectCtrl', Controller);

    function Controller($scope) {

    }

})();
(function() {
    'use strict'

    angular.module('ngObject')
        .directive('ngFieldToolbox', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'ngObject/ng-field-toolbox.tpl.html',
            replace: true
        }
    }
})();
(function() {
    'use strict'

    angular.module('ngObject')
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
angular.module("ngObject").run(["$templateCache", function($templateCache) {$templateCache.put("ngObject/ng-field-array.tpl.html","<div class=\"ng-field form-group\">\r\n    <ng-field-toolbox></ng-field-toolbox>\r\n    <label class=\"col-sm-2 control-label\" ng-bind=\"key\"></label>\r\n    <div class=\"col-sm-10\">\r\n        <p class=\"form-control-static\">array</p>\r\n    </div>\r\n</div>\r\n<div class=\"row form-group field-object\">\r\n    <div class=\"col-md-12\">\r\n        <ng-field ng-repeat=\"(k, value) in model[key] track by k\" ng-init=\"model = model[key]; key = k;\"></ng-field>\r\n    </div>\r\n</div>");
$templateCache.put("ngObject/ng-field-boolean.tpl.html","<div class=\"ng-field ng-field-boolean form-group\">\r\n    <ng-field-toolbox></ng-field-toolbox>\r\n    <!--<label class=\"col-sm-2 control-label\" ng-bind=\"key\"></label>-->\r\n    <input class=\"col-sm-2 form-control control-label\" ng-model=\"key\" placeholder=\"string\">\r\n    <div class=\"col-sm-9\">\r\n        <label class=\"radio-inline\">\r\n            <input type=\"radio\" name=\"boolean\" ng-model=\"model[key]\" ng-value=\"true\"> true\r\n        </label>\r\n        <label class=\"radio-inline\">\r\n            <input type=\"radio\" name=\"boolean\" ng-model=\"model[key]\" ng-value=\"false\"> false\r\n        </label>\r\n    </div>\r\n</div>");
$templateCache.put("ngObject/ng-field-number.tpl.html","<div class=\"ng-field form-group\">\r\n    <ng-field-toolbox></ng-field-toolbox>\r\n    <label for=\"{{ key }}\" class=\"col-sm-2 control-label\" ng-bind=\"key\"></label>\r\n    <div class=\"col-sm-9\">\r\n        <input class=\"form-control\" type=\"number\" ng-model=\"model[key]\" id=\"{{ key }}\" placeholder=\"number\">\r\n    </div>\r\n</div>");
$templateCache.put("ngObject/ng-field-object.tpl.html","<div class=\"ng-field form-group\">\r\n    <ng-field-toolbox></ng-field-toolbox>\r\n    <label class=\"col-sm-2 control-label\" ng-bind=\"key\"></label>\r\n    <div class=\"col-sm-10\">\r\n        <p class=\"form-control-static\">object</p>\r\n    </div>\r\n</div>\r\n<div class=\"row form-group field-object\">\r\n    <div class=\"col-md-12\">\r\n        <ng-object model=\"model[key]\"></ng-object>\r\n    </div>\r\n</div>");
$templateCache.put("ngObject/ng-field-string.tpl.html","<div class=\"ng-field form-group\">\r\n    <ng-field-toolbox></ng-field-toolbox>\r\n    <label for=\"{{ key }}\" class=\"col-sm-2 control-label\" ng-bind=\"key\"></label>\r\n    <div class=\"col-sm-9\">\r\n        <input class=\"form-control\" ng-model=\"model[key]\" id=\"{{ key }}\" placeholder=\"string\">\r\n    </div>\r\n</div>");
$templateCache.put("ngObject/ng-field-toolbox.tpl.html","<div class=\"ng-field-toolbox\">\r\n    <div class=\"ng-field-toolbox-right\">\r\n        <button class=\"btn btn-default btn-xs\">\r\n            <span class=\"glyphicon glyphicon-arrow-down\"></span>\r\n        </button>\r\n        <button class=\"btn btn-default btn-xs\">\r\n            <span class=\"glyphicon glyphicon-arrow-up\"></span>\r\n        </button>\r\n        <button class=\"btn btn-default btn-xs\">\r\n            <span class=\"glyphicon glyphicon-trash\"></span>\r\n        </button>\r\n    </div>\r\n</div>");
$templateCache.put("ngObject/ng-field.tpl.html","<span>\r\n<span ng-include=\"tpl\" ng-init=\"tpl = templateOf(value)\"></span>\r\n</span>");
$templateCache.put("ngObject/ng-object.tpl.html","<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n        <ng-field ng-repeat=\"(key, value) in model  track by key\"></ng-field>\r\n    </div>\r\n</div>");}]);