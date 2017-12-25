var gulp = require('gulp'),
webserver = require("gulp-webserver"),
sourcemaps = require("gulp-sourcemaps"),
sass = require("gulp-sass");
cleanCSS = require('gulp-clean-css');



// sass task
gulp.task('sass', function() {
return gulp.src(['./src/styles/styles.scss'])
    .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./styles/'));
});


// local server for dev
gulp.task('serve', function() {
gulp.src('./')
.pipe(webserver({
  port:'9090',
  livereload: true,
  open: true
}));
});


// Minify CSS
gulp.task('minify-css', () => {
    return gulp.src('./styles/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('./styles/'));
});


// Watchers
gulp.task('watch', function () {
gulp.watch([
    './src/styles/components/*.scss',
    './src/styles/partials/*.scss'
], ['sass']);
});


gulp.task('default', ['sass', 'minify-css', 'serve', 'watch']);