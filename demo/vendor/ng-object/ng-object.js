(function() {
    'use strict'

    angular.module('ngObject', [
        

    ]);

})();

(function() {

    angular.module('ngObject')
        .controller('NgFieldLabelCtrl', Controller);

    function Controller($scope, $element, $timeout, NgObject) {

        var $ngField = $scope.$ngField[$scope.key] = {};

        this.allow = !angular.isArray($scope.model);

        this.accept = function () {
            if ($scope.key != $ngField.key) {
                var index = Object.keys($scope.model).indexOf($scope.key);
                NgObject.reorder($scope.model, $ngField.key, {index: index, factor: 1});
            }
        }

        this.discard = function () {
            $ngField.input = false
        }

        this.input = function () {
            $ngField.key = $scope.key;
            $ngField.input = true;
            $timeout(function() {
                $element.find('input').focus();
            });
        }

        this.keyup = function($event) {
            if($event.keyCode == 13) {
                this.accept();
            } else if ($event.keyCode == 27) {
                this.discard();
            } else {
                angular.noop()
            }
        }

    }

})();
(function() {

    angular.module('ngObject')
        .controller('NgFieldCtrl', Controller);

    function Controller($scope, $timeout, NgObject) {

        $scope.$ngField = {};

        var template = {
            object: 'ngObject/ng-field-object.tpl.html',
            array: 'ngObject/ng-field-array.tpl.html',
            string: 'ngObject/ng-field-string.tpl.html',
            boolean: 'ngObject/ng-field-boolean.tpl.html',
            number: 'ngObject/ng-field-number.tpl.html'
        }

        $scope.templateOf = function(value) {
            return template[isArray(value) ? 'array' : typeof value];
        };

        $scope.moveUp = function() {
            move(-1);
        }

        $scope.moveDown = function() {
            move(1);
        }

        $scope.delete = function() {
            if(isArray()) {
                $scope.model.splice($scope.key, 1);
            } else {
                delete $scope.model[$scope.key];
            }
        }

        function isArray(value) {
            return angular.isArray(value || $scope.model);
        }

        function move (factor) {
            var index, value;
            if(isArray()) {
                NgObject.reorderArray($scope.model, $scope.key, factor);
            } else {
                index = Object.keys($scope.model).indexOf($scope.key);
                NgObject.reorder($scope.model, $scope.key, {index: index, factor: factor});

                // When the order of the keys change, and the key value is primitive,
                // ng-repeat is not updated because the track by.
                value = $scope.model[$scope.key];
                if(!isArray() && typeof value != 'object') {
                    $scope.model[$scope.key] = undefined;
                    $timeout(function() {
                        $scope.model[$scope.key] = value;
                    });
                }
            }
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
(function () {

    angular.module('ngObject')
        .service('NgObject', Service);

    function Service() {

        this.reorder = function (object, key, option) {

            var copy = angular.copy(object)
                , keys = Object.keys(object)
                , value
                , k

            if (option.factor) {
                option.index = this.reorderArray(keys, option.index, option.factor);
            }

            for (var i = 0, len = keys.length; i < len; i++) {
                delete object[keys[i]];
            }

            for (var i = 0, len = keys.length; i < len; i++) {
                k = keys[i];
                value = copy[k];
                if (i == option.index) {
                    k = key;
                }
                object[k] = value;
            }

            return object;
        }

        this.reorderArray = function(array, index, factor) {

            var targetIndex = index + factor;
            if (targetIndex < 0) targetIndex = 0;

            var value = array[targetIndex];
            array[targetIndex] = array[index];
            array[index] = value;

            return targetIndex;
        }

    }

})();
angular.module("ngObject").run(["$templateCache", function($templateCache) {$templateCache.put("ngObject/ng-field-array.tpl.html","<div class=\"ng-field form-group\">\r\n    <ng-field-toolbox></ng-field-toolbox>\r\n    <ng-field-label></ng-field-label>\r\n    <div class=\"col-sm-10\">\r\n        <p class=\"form-control-static\">array</p>\r\n    </div>\r\n</div>\r\n<div class=\"row form-group field-object\">\r\n    <div class=\"col-md-12\">\r\n        <ng-field ng-repeat=\"(k, value) in model[key] track by k\" ng-init=\"model = model[key]; key = k;\"></ng-field>\r\n    </div>\r\n</div>");
$templateCache.put("ngObject/ng-field-boolean.tpl.html","<div class=\"ng-field ng-field-boolean form-group\">\r\n    <ng-field-toolbox></ng-field-toolbox>\r\n    <ng-field-label></ng-field-label>\r\n    <div class=\"col-sm-9\">\r\n        <label class=\"radio-inline\">\r\n            <input type=\"radio\" name=\"boolean\" ng-model=\"model[key]\" ng-value=\"true\"> true\r\n        </label>\r\n        <label class=\"radio-inline\">\r\n            <input type=\"radio\" name=\"boolean\" ng-model=\"model[key]\" ng-value=\"false\"> false\r\n        </label>\r\n    </div>\r\n</div>");
$templateCache.put("ngObject/ng-field-label.tpl.html","<span ng-switch=\"$ngField[key].input && fieldLabelCtrl.allow\">\r\n    <div ng-keyup=\"fieldLabelCtrl.keyup($event)\" ng-switch-when=\"true\" class=\"col-sm-2 input-label\">\r\n        <input class=\"col-sm-2 form-control\" ng-blur=\"fieldLabelCtrl.discard()\" ng-model=\"$ngField[key].key\"  placeholder=\"string\">\r\n    </div>\r\n    <label ng-click=\"fieldLabelCtrl.input()\" ng-switch-default class=\"col-sm-2 control-label\" ng-bind=\"key\"></label>\r\n</span>");
$templateCache.put("ngObject/ng-field-number.tpl.html","<div class=\"ng-field form-group\">\r\n    <ng-field-toolbox></ng-field-toolbox>\r\n    <ng-field-label></ng-field-label>\r\n    <div class=\"col-sm-9\">\r\n        <input class=\"form-control\" type=\"number\" ng-model=\"model[key]\" id=\"{{ key }}\" placeholder=\"number\">\r\n    </div>\r\n</div>");
$templateCache.put("ngObject/ng-field-object.tpl.html","<div class=\"ng-field form-group\">\r\n    <ng-field-toolbox></ng-field-toolbox>\r\n    <ng-field-label></ng-field-label>\r\n    <div class=\"col-sm-10\">\r\n        <p class=\"form-control-static\">object</p>\r\n    </div>\r\n</div>\r\n<div class=\"row form-group field-object\">\r\n    <div class=\"col-md-12\">\r\n        <ng-object model=\"model[key]\"></ng-object>\r\n    </div>\r\n</div>");
$templateCache.put("ngObject/ng-field-string.tpl.html","<div class=\"ng-field form-group\">\r\n    <ng-field-toolbox></ng-field-toolbox>\r\n    <ng-field-label></ng-field-label>\r\n    <div class=\"col-sm-9\">\r\n        <input class=\"form-control\" ng-model=\"model[key]\" id=\"{{ key }}\" placeholder=\"string\">\r\n    </div>\r\n</div>");
$templateCache.put("ngObject/ng-field-toolbox.tpl.html","<div class=\"ng-field-toolbox\">\r\n    <div class=\"ng-field-toolbox-right\">\r\n        <button class=\"btn btn-default btn-xs\" ng-click=\"moveUp()\">\r\n            <span class=\"glyphicon glyphicon-arrow-up\"></span>\r\n        </button>\r\n        <button class=\"btn btn-default btn-xs\" ng-click=\"moveDown()\">\r\n            <span class=\"glyphicon glyphicon-arrow-down\"></span>\r\n        </button>\r\n        <button class=\"btn btn-default btn-xs\" ng-click=\"delete()\">\r\n            <span class=\"glyphicon glyphicon-trash\"></span>\r\n        </button>\r\n    </div>\r\n</div>");
$templateCache.put("ngObject/ng-field.tpl.html","<span>\r\n    <span ng-include=\"tpl\" ng-init=\"tpl = templateOf(value)\"></span>\r\n</span>");
$templateCache.put("ngObject/ng-object.tpl.html","<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n        <ng-field ng-repeat=\"(key, value) in model  track by key\"></ng-field>\r\n    </div>\r\n</div>");}]);