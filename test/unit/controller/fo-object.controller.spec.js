describe('controller: FoObjectCtrl', function () {

    var controller, scope;

    beforeEach(module('formobject'));

    function before(model) {
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();

            scope.model = model;

            controller = $controller('NgObjectCtrl', {
                $scope: scope
            });

        }));
    }

    describe('Object as Model', function () {

        before({'one': 1, 'two': 2});

        it('add new attribute to object', function () {
            scope.add();
            expect(scope.model['new 3']).toBe('');
        });

    });

    describe('Array as Model', function () {

        before([1, 2]);

        it('add new attribute to array', function () {
            scope.add();
            expect(scope.model[2]).toBe('');
        });

    });

});