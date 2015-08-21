(function() {
    'use strict'

    angular.module('demo', [
        
        'ngObject' 

    ]);

})();

(function () {
    'use strict'

    angular.module('demo')
        .controller('DemoCtrl', Controller);

    function Controller($scope) {

        this.example = {};

    }

})();