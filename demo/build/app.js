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

        this.example = {
            name: 'demo',
            homepage: 'https://github.com/otaviodecampos/ng-object',
            author: {
                name: 'otaviodecampos',
                email: 'otaviodecampos@hotmail.com',
                active: true,
                age: 25,
                knows: [
                    'angular', 'javascript', 'java', 'css', 'html'
                ]
            }
        }

    }

})();