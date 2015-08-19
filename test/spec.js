describe('Test Demo App', function() {

    var example = element(by.binding('democtrl.example'));

    beforeEach(function() {
        browser.get('http://localhost:8080/');
    });

    function setValue(element, value) {
        element.clear().sendKeys(value);
        element.sendKeys(protractor.Key.ENTER);

    }

    function moveUp(field) {
        var moveUpButton = field.element(by.css('[ng-click="moveUp()"]'));
        browser.actions().mouseMove(field).perform();
        moveUpButton.click();
    }

    function getObjectExample(next) {
        var deferred = protractor.promise.defer();

        example.getInnerHtml().then(function(json) {
            deferred.fulfill(JSON.parse(json));
        });

        return deferred.promise;
    }

    it('test: update string field', function() {
        var field = element(by.id('name=input'))
        , value = 'New Value';

        setValue(field, value);

        getObjectExample().then(function(obj) {
            expect(obj.name).toEqual(value);
        });
    });

    it('test: update boolean(radio) field', function() {
        var id = 'author.active'
            , field = element(by.id(id))
            , radio_false = field.element(by.id(id + '=false'));

        radio_false.click();

        getObjectExample().then(function(obj) {
            console.log(111);
            expect(obj.author.active).toEqual(false);
        });
    });

    it('test: update number field', function() {
        var id = 'author.age'
            , field = element(by.id(id))
            , input = field.element(by.id(id + '=input'))
            , value = 26;

        setValue(input, value);

        getObjectExample().then(function(obj) {
            expect(obj.author.age).toEqual(value);
        });
    });

    it('test: update field key', function() {
        var id = 'author.email'
            , key = 'e-mail'
            , field = element(by.id(id))
            , label = field.element(by.css('.control-label'))
            , input = field.element(by.css('.form-control'));

        label.click();
        setValue(input, key);

        getObjectExample().then(function(obj) {
            expect(obj.author.email).toBeUndefined();
            expect(obj.author[key]).toBeDefined();
        });

    });

    it('test: move up string field', function() {
        var id = 'homepage'
            , field = element(by.id(id));

        moveUp(field);

        getObjectExample().then(function(obj) {
            expect(Object.keys(obj).indexOf(id)).toEqual(0);
        });
    });

    it('test: move up object field', function() {
        var id = 'author'
            , field = element(by.id(id));

        moveUp(field);

        getObjectExample().then(function(obj) {
            expect(Object.keys(obj).indexOf(id)).toEqual(1);
        });
    });

    it('test: move up array field', function() {
        var id = 'author.knows'
            , field = element(by.id(id));

        moveUp(field);

        getObjectExample().then(function(obj) {
            expect(Object.keys(obj.author).indexOf('knows')).toEqual(3);
        });
    });

});