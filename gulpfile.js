var gulp = require('gulp');
//var minify = require('gulp-minify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var uncss = require('gulp-uncss');

const { series } = gulp;

function minifyJs() {
  var stream = gulp
    .src('./src/public/js/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/public/js/'));
  return stream;
}

function watchJs() {
  gulp.watch(['./src/public/js/*.js']);
}

exports.default = series(minifyJs, watchJs);
