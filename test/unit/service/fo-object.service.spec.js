describe('service: FoObject', function () {
    var foObject;

    beforeEach(module('formobject'));
    beforeEach(inject(function (_NgObject_) {
        foObject = _NgObject_;
    }));

    it('reorder array', function () {

        var array = ['one', 'two', 'tree']
            , index = 0
            , factor = 2;

        foObject.reorderArray(array, index, factor);
        expect(array.indexOf('one')).toBe(2);
    });

    it('reorder object', function () {

        var obj = {
            one: 1,
            two: 2,
            tree: 3
        };

        var options = {
            factor: 2
        }

        foObject.reorder(obj, 'one', options);
        expect(Object.keys(obj).indexOf('one')).toBe(2);
    });

});