var gulp = require('gulp')
    , ngjson = require('gulp-ng-json')
    , concat = require('gulp-concat');

module.exports = function () {

    var input = this.input('demo/source', ['**/*.json', '**/*.js']);

    return gulp.src(input)
        .pipe(ngjson.module())
        .pipe(ngjson.constant())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('demo/build'));

}