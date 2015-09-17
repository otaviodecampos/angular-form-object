(function () {
    'use strict'

    angular.module('demo')
        .controller('DemoCtrl', Controller);

    function Controller($scope) {

        var _this = this;
        _this.obj = {
            name: 'angular-form-object',
            description: 'Form object built in angular and bootstrap.',
            obj: {
                "a": 1
            }
        };

        _this.aceBlur = function(e) {
            try {
                _this.obj = JSON.parse(_this.source);
            } catch (e) {

            }
        };

        $scope.$watch('democtrl.obj', function (obj) {
          _this.source = JSON.stringify(obj, null, 2);
        }, true);

    }

})();
