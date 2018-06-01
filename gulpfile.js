var gulp = require('gulp');
//var minify = require('gulp-minify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('minify-js', function() {
  var stream = gulp.src('./src/public/js/*.js').pipe(uglify()).pipe(rename({ extname: '.min.js' })).pipe(gulp.dest('./dist/public/js/'));
  return stream;
});

gulp.task('watch:js', function() {
  gulp.watch('./src/public/js/*.js', ['default']);
});

gulp.task('default', ['minify-js', 'watch:js']);