describe('controller: FoFieldCtrl', function () {

    var controller, scope, fieldScope;

    beforeEach(module('formobject'));

    function before(model) {
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();

            scope.model = angular.copy(model);

            $controller('NgObjectCtrl', {
                $scope: scope
            });

            fieldScope = scope.$new();
            fieldScope.key = Object.keys(scope.model)[1];
            fieldScope.value = scope.model[fieldScope.key];

            controller = $controller('FoFieldCtrl', {
                $scope: fieldScope
            });

        }));
    }

    describe('Object as Model', function () {

        before({'one': 1, 'two': 2, 'tree': 3});

        it('move down object field', function () {
            fieldScope.moveDown();
            expect(Object.keys(scope.model).indexOf('two')).toEqual(2);
        });

        it('move up object field', function () {
            fieldScope.moveUp();
            expect(Object.keys(scope.model).indexOf('two')).toEqual(0);
        });

        it('delete object field', function () {
            fieldScope.delete();
            expect(Object.keys(scope.model).indexOf('two')).toEqual(-1);
        });

    });

    describe('Array as Model', function () {

        before([1, 2, 3]);

        it('move down array value', function () {
            fieldScope.moveDown();
            expect(scope.model.indexOf(2)).toEqual(2);
        });

        it('move up array value', function () {
            fieldScope.moveUp();
            expect(scope.model.indexOf(2)).toEqual(0);
        });

        it('delete array value', function () {
            fieldScope.delete();
            expect(scope.model.indexOf(2)).toEqual(-1);
        });

    });

});