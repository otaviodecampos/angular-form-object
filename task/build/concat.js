var gulp = require('gulp')
    , ngjson = require('gulp-ng-json')
    , concat = require('gulp-concat')
    , templateCache = require('gulp-angular-templatecache')
    , es = require('event-stream')
    , order = require("gulp-order");

module.exports = function () {

    var input = this.input(this.sourceDir, ['**/*.json', '**/*.js'])
        , inputTpl = this.input(this.sourceDir, ['**/*.tpl.html']);

    var options = {
        module: 'formobject',
        transformUrl: function(url) {
            return 'formobject/' + url.match(/[\w-]+.tpl.html$/g)[0];
        }
    }

    var tplStream = gulp.src(inputTpl)
        .pipe(templateCache(options));

    var jsStream = gulp.src(input)
        .pipe(ngjson.module())
        .pipe(ngjson.constant());

    return es.merge(jsStream, tplStream)
        .pipe(order([
            "**/*.json",
            "**/*.js",
            "**/*.tpl.html"
        ]))
        .pipe(concat('angular-form-object.js'))
        .pipe(gulp.dest(this.targetDir));

}
