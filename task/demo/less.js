var gulp = require('gulp')
    , less = require('gulp-less')
    , rename = require('gulp-rename');

module.exports = function () {

    var input = this.input('demo/source/css', ['app.less']);

    return gulp.src(input)
        .pipe(less())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('demo/build'));

}
