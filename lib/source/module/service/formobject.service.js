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
