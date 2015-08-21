(function() {
    'use strict'

    angular.module('demo', [
        
        'formoc', 
        'ui.ace' 

    ]);

})();

(function () {
    'use strict'

    angular.module('demo')
        .controller('DemoCtrl', Controller);

    function Controller($scope, $timeout) {

        var _this = this;
        _this.obj = {};

        _this.aceFocus = function() {

        }

        _this.aceBlur = function(e) {
            try {
                _this.obj = JSON.parse(_this.source);
            } catch (e) {

            }
        };

        $scope.$watch('democtrl.obj', function (obj) {
          _this.source = JSON.stringify(obj, null, 2);
          ace.edit($('.ace_editor')[0]).resize();
          ace.edit($('.ace_editor')[0]).renderer.updateFull();
        }, true);

    }

})();
