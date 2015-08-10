var gulp = require('gulp')
    , less = require('gulp-less');

module.exports = function () {

    var input = this.input(this.paths.source.style, ['ng-object.less']);

    return gulp.src(input)
        .pipe(less())
        .pipe(gulp.dest(this.targetDir));

}
