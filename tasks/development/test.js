var gulp = require('gulp');

module.exports = function () {

    var input = this.input(this.sourceDir, ['**/*.html']);

    return gulp.src(input)
        .pipe(gulp.dest(this.targetDir));

}
