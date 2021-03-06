(function() {
    'use strict'

    angular.module('formobject', [
        

    ]);

})();

(function() {
    'use strict'

    angular.module('formobject')
        .constant('TEMPLATE', Constant());

    function Constant() {
        return {
          "object": "formobject/fo-field-object.tpl.html",
          "array": "formobject/fo-field-array.tpl.html",
          "string": "formobject/fo-field-string.tpl.html",
          "boolean": "formobject/fo-field-boolean.tpl.html",
          "number": "formobject/fo-field-number.tpl.html",
          "null": "formobject/fo-field-null.tpl.html",
          "undefined": "formobject/fo-field-undefined.tpl.html"
};
    }

})();

(function() {

    angular.module('formobject')
        .controller('NgFieldKeyCtrl', Controller);

    function Controller($scope, $element, $timeout, NgObject) {

        var $foField = $scope.$foField;

        this.allow = !angular.isArray($scope.model) && !$scope.formNoEditableKey;

        this.accept = function () {
            if ($scope.key != $foField.key) {
                var index = Object.keys($scope.model).indexOf($scope.key);
                NgObject.reorder($scope.model, $foField.key, {index: index});
            }
        }

        this.discard = function () {
            $foField.input = false
        }

        this.input = function () {
            $foField.key = $scope.key;
            $foField.input = true;
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

    angular.module('formobject')
        .controller('NgFieldTypeCtrl', Controller);

    function Controller($scope, TEMPLATE) {

        this.types = Object.keys(TEMPLATE);

        if($scope.model[$scope.key] == null || $scope.model[$scope.key] == undefined) {
            this.type = String($scope.model[$scope.key]);
        } else if(angular.isArray($scope.model[$scope.key])) {
            this.type = 'array';
        } else {
            this.type = typeof $scope.model[$scope.key];
        }

        this.set = function(newType) {
            var value = $scope.model[$scope.key]
                , tpl = TEMPLATE[newType]
                , cast = this.type != 'object'

            if(newType == 'array') {
                value = [value];
                if(!cast) {
                    value = [];
                }
            } else if(newType == 'null') {
                value = null;
            } else if(newType == 'undefined') {
                value = undefined;
            } else if(newType == 'object') {
                value = {};
            } else {
                if(!cast) {
                   value = '';
                }
                value = window[newType.charAt(0).toUpperCase() + newType.slice(1)](value);
            }

            $scope.setValue(value, tpl);
        }

    }

})();

(function() {

    angular.module('formobject')
        .controller('FoFieldCtrl', Controller);

    function Controller($scope, $timeout, NgObject, TEMPLATE) {

        $scope.tpl = TEMPLATE[typeof $scope.value];

        $scope.$foField = {
            path: ($scope.path ? [$scope.path, $scope.key].join('.') : $scope.key).replace(/[^a-zA-Z0-9]/g, "_")
        };

        $scope.String = String;

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

        $scope.setValue = function(value, tpl) {
            $scope.tpl = tpl || TEMPLATE[typeof value];
            $scope.$on('$includeContentLoaded', function() {
                $scope.model[$scope.key] = value;
            });
        }

        $scope.isArray = isArray;
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

                // Force the ng-repeat to reflect sorting by attributes
                value = $scope.model[$scope.key];
                $scope.model[$scope.key] = typeof(value) == 'object' ? angular.copy(value) : undefined;
                $timeout(function() {
                    $scope.model[$scope.key] = value;
                });
            }
        }

    }

})();

(function() {

    angular.module('formobject')
        .controller('NgObjectCtrl', Controller);

    function Controller($scope) {

        $scope.$ngObject = {
            array: isArray()
        };

        $scope.add = function () {
            if(isArray()) {
                $scope.model.push('');
            } else {
                $scope.model['new ' + (Object.keys($scope.model).length + 1)] = '';
            }

        }

        function isArray() {
            return angular.isArray($scope.model);
        }

    }

})();

(function() {
    'use strict'

    angular.module('formobject')
        .directive('foFieldKey', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'formobject/fo-field-key.tpl.html',
            replace: true,
            controller: 'NgFieldKeyCtrl as fieldKeyCtrl'
        }
    }
})();

(function() {
    'use strict'

    angular.module('formobject')
        .directive('foFieldToolbox', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'formobject/fo-field-toolbox.tpl.html',
            replace: true
        }
    }
})();

(function() {
    'use strict'

    angular.module('formobject')
        .directive('foFieldTypeselect', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'formobject/fo-field-typeselect.tpl.html',
            replace: true,
            controller: 'NgFieldTypeCtrl as typeCtrl'
        }
    }
})();

(function() {
    'use strict'

    angular.module('formobject')
        .directive('foField', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'formobject/fo-field.tpl.html',
            replace: true,
            controller: 'FoFieldCtrl as fieldCtrl'
        }
    }
})();

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

(function () {

    angular.module('formobject')
        .service('NgObject', Service);

    function Service() {

        this.reorder = function (object, key, option) {

            var copy = {}
                , keys = Object.keys(object)
                , value
                , k;

            angular.extend(copy, object);

            if(option.index == undefined) {
                option.index = keys.indexOf(key);
            }

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

            var targetIndex = parseInt(index) + parseInt(factor);
            if (targetIndex < 0) targetIndex = 0;

            var value = array[targetIndex];
            array[targetIndex] = array[index];
            array[index] = value;

            return targetIndex;
        }

    }

})();

angular.module("formobject").run(["$templateCache", function($templateCache) {$templateCache.put("formobject/fo-field-array.tpl.html","<div class=\"form-group fo-field-object\">\r\n    <fo-field-toolbox></fo-field-toolbox>\r\n    <fo-field-key></fo-field-key>\r\n    <div class=\"col-sm-10\">\r\n        <button class=\"btn btn-hover btn-default btn-xs\" data-toggle=\"collapse\" data-target=\"#{{ ::$foField.path }}_value\">\r\n            <span class=\"glyphicon glyphicon-eye-open\"></span>\r\n        </button>\r\n        <fo-field-typeselect></fo-field-typeselect>\r\n    </div>\r\n</div>\r\n<div class=\"row form-group field-object collapse in\" id=\"{{ ::$foField.path }}_value\">\r\n    <div class=\"col-md-12\">\r\n        <ng-object path=\"$foField.path\" model=\"model[key]\"></ng-object>\r\n    </div>\r\n</div>");
$templateCache.put("formobject/fo-field-boolean.tpl.html","<div class=\"fo-field-boolean form-group\">\r\n    <fo-field-toolbox></fo-field-toolbox>\r\n    <fo-field-key></fo-field-key>\r\n    <div class=\"col-sm-10\">\r\n        <div class=\"checkbox c-checkbox\">\r\n            <label>\r\n                <input type=\"checkbox\" name=\"{{ ::$foField.path }}\" ng-model=\"model[key]\">\r\n                <span class=\"glyphicon glyphicon-ok\"></span> {{ String(model[key]) }}\r\n            </label>\r\n        </div>\r\n        <fo-field-typeselect></fo-field-typeselect>\r\n    </div>\r\n</div>");
$templateCache.put("formobject/fo-field-key.tpl.html","<span class=\"fo-field-key\" ng-switch=\"fieldKeyCtrl.allow && $foField.input\">\r\n    <div ng-keyup=\"fieldKeyCtrl.keyup($event)\" ng-switch-when=\"true\" class=\"col-sm-2 input-label\">\r\n        <input class=\"col-sm-2 form-control\" ng-blur=\"fieldKeyCtrl.discard()\" ng-model=\"$foField.key\"  placeholder=\"string\">\r\n    </div>\r\n    <label ng-switch-default ng-click=\"fieldKeyCtrl.allow && fieldKeyCtrl.input()\" class=\"col-sm-2 control-label\" ng-bind=\"key\"></label>\r\n</span>");
$templateCache.put("formobject/fo-field-null.tpl.html","<div class=\"form-group\">\r\n    <fo-field-toolbox></fo-field-toolbox>\r\n    <fo-field-key></fo-field-key>\r\n    <div class=\"col-sm-10\">\r\n        <fo-field-typeselect></fo-field-typeselect>\r\n    </div>\r\n</div>");
$templateCache.put("formobject/fo-field-number.tpl.html","<div class=\"form-group\">\r\n    <fo-field-toolbox></fo-field-toolbox>\r\n    <fo-field-key></fo-field-key>\r\n    <div class=\"col-sm-10\">\r\n        <div class=\"input-group\">\r\n            <fo-field-typeselect></fo-field-typeselect>\r\n            <input class=\"form-control\" type=\"number\" ng-model=\"model[key]\" id=\"{{ ::$foField.path }}=input\" placeholder=\"number\">\r\n        </div>\r\n    </div>\r\n</div>\r\n");
$templateCache.put("formobject/fo-field-object.tpl.html","<div class=\"form-group fo-field-object\">\r\n    <fo-field-toolbox></fo-field-toolbox>\r\n    <fo-field-key></fo-field-key>\r\n    <div ng-if=\"!formNoEditableKey\" class=\"col-sm-10\">\r\n        <button class=\"btn btn-hover btn-default btn-xs\" data-toggle=\"collapse\" data-target=\"#{{ ::$foField.path }}_value\">\r\n            <span class=\"glyphicon glyphicon-eye-open\"></span>\r\n        </button>\r\n        <fo-field-typeselect></fo-field-typeselect>\r\n    </div>\r\n</div>\r\n<div class=\"row form-group field-object collapse in\" id=\"{{ ::$foField.path }}_value\">\r\n    <div class=\"col-md-12\">\r\n        <ng-object form-no-editable-key=\"formNoEditableKey\" path=\"$foField.path\" model=\"model[key]\"></ng-object>\r\n    </div>\r\n</div>");
$templateCache.put("formobject/fo-field-string.tpl.html","<div class=\"form-group\">\r\n    <fo-field-toolbox></fo-field-toolbox>\r\n    <fo-field-key></fo-field-key>\r\n    <div class=\"col-sm-10\">\r\n        <div class=\"input-group\">\r\n            <fo-field-typeselect></fo-field-typeselect>\r\n            <input type=\"text\" class=\"form-control\" ng-model=\"model[key]\" id=\"{{ ::$foField.path }}=input\" placeholder=\"string\">\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("formobject/fo-field-toolbox.tpl.html","<div ng-if=\"formEditableKey\" class=\"fo-field-toolbox\">\r\n    <div class=\"fo-field-toolbox-right\">\r\n        <button class=\"btn btn-default btn-xs\" ng-click=\"moveUp()\">\r\n            <span class=\"glyphicon glyphicon-arrow-up\"></span>\r\n        </button>\r\n        <button class=\"btn btn-default btn-xs\" ng-click=\"moveDown()\">\r\n            <span class=\"glyphicon glyphicon-arrow-down\"></span>\r\n        </button>\r\n        <button class=\"btn btn-default btn-xs\" ng-click=\"delete()\">\r\n            <span class=\"glyphicon glyphicon-trash\"></span>\r\n        </button>\r\n    </div>\r\n</div>");
$templateCache.put("formobject/fo-field-typeselect.tpl.html","<div class=\"fo-field-typeselect\" ng-if=\"!formNoEditableKey\" ng-class=\"::{ true: \'btn-group\', false: \'input-group-btn\' }[[\'string\', \'number\'].indexOf(typeCtrl.type) == -1]\">\r\n    <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">{{ ::String(typeCtrl.type) }} <span class=\"caret\"></span></button>\r\n    <ul class=\"dropdown-menu dropdown-menu-right\">\r\n        <li ng-repeat=\"type in ::typeCtrl.types track by type\"><a href=\"#\" ng-click=\"typeCtrl.set(type)\">{{ ::type }}</a></li>\r\n    </ul>\r\n</div>");
$templateCache.put("formobject/fo-field-undefined.tpl.html","<div class=\"form-group\">\r\n    <fo-field-toolbox></fo-field-toolbox>\r\n    <fo-field-key></fo-field-key>\r\n    <div class=\"col-sm-10\">\r\n        <!--<p class=\"form-control-static\">{{ ::String(value) }}</p>-->\r\n        <fo-field-typeselect></fo-field-typeselect>\r\n    </div>\r\n</div>");
$templateCache.put("formobject/fo-field.tpl.html","<span id=\"{{ ::$foField.path }}\" class=\"fo-field\" ng-class=\"{input: $foField.input}\" ng-include=\"tpl\"></span>");
$templateCache.put("formobject/fo-object.tpl.html","<div class=\"row ng-object\" ng-class=\"{\'form-horizontal\': formHorizontal, \'form-no-editable-key\': formNoEditableKey}\">\r\n    <div class=\"col-md-12\">\r\n        <fo-field class=\"fo-field-repeat\" ng-repeat=\"(key, value) in model track by key\"></fo-field>\r\n        <div ng-if=\"!formNoEditableKey\" class=\"form-group last\">\r\n            <div class=\"col-md-2\"></div>\r\n            <div class=\"col-sm-10\">\r\n                <button class=\"btn btn-hover btn-default btn-xs\" ng-click=\"add()\">\r\n                    <span class=\"glyphicon glyphicon-plus\"></span>\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");}]);