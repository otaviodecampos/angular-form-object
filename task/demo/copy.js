var gulp = require('gulp');

module.exports = function () {

    var input = this.input('lib/build', ['**/*']);

    return gulp.src(input)
        .pipe(gulp.dest('demo/vendor/ng-object'));

}
