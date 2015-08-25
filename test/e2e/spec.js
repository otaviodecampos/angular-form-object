describe('Test Demo App', function() {

    var example = element(by.binding('democtrl.obj'))
        , aceDiv = $('div.ace_content')
        , aceInput = $('textarea.ace_text-input')
        , keys = {
            select_all: protractor.Key.chord(protractor.Key.CONTROL, "a"),
            backspace: protractor.Key.BACK_SPACE
        };

    var obj = {
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

    beforeEach(function() {
        browser.get('http://localhost:8080/');
        setAce(obj);
    });

    function setAce(obj) {
        element(by.css('a[href="#json"]')).click();
        browser.sleep(250);
        browser.actions().doubleClick(aceDiv).perform();

        aceInput.sendKeys(keys.select_all)
            .sendKeys(keys.backspace)
            .sendKeys(JSON.stringify(obj));

        element(by.css('a[href="#form"]')).click();
        browser.sleep(500);
    }

    function setValue(element, value) {
        element.clear().sendKeys(value);
        element.sendKeys(protractor.Key.ENTER);
    }

    function moveUp(field, childClass) {

        if(childClass) {
            field = field.element(by.css(childClass));
        }

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
        var id = 'author_active'
            , field = element(by.id(id))
            , input = field.element(by.css('input'));

        input.click();

        getObjectExample().then(function(obj) {
            expect(obj.author.active).toEqual(false);
        });
    });

    it('test: update number field', function() {
        var id = 'author_age'
            , field = element(by.id(id))
            , input = field.element(by.id(id + '=input'))
            , value = 26;

        setValue(input, value);

        getObjectExample().then(function(obj) {
            expect(obj.author.age).toEqual(value);
        });
    });

    it('test: update field key', function() {
        var id = 'author_email'
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

    moveUp(field, '.fo-field-object');

        getObjectExample().then(function(obj) {
            expect(Object.keys(obj).indexOf(id)).toEqual(1);
        });
    });

    it('test: move up array field', function() {
        var id = 'author_knows'
            , field = element(by.id(id));

        moveUp(field, '.fo-field-object');

        getObjectExample().then(function(obj) {
            expect(Object.keys(obj.author).indexOf('knows')).toEqual(3);
        });
    });

});