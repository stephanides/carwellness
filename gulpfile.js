var gulp = require('gulp');
//var minify = require('gulp-minify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var uncss = require('gulp-uncss');

gulp.task('minify-js', function() {
  var stream = gulp.src('./src/public/js/*.js').pipe(uglify()).pipe(rename({ extname: '.min.js' })).pipe(gulp.dest('./dist/public/js/'));
  return stream;
});

gulp.task('watch:js', function() {
  gulp.watch('./src/public/js/*.js', ['default']);
});

gulp.task('uncss:css', function() {
  return gulp.src('./dist/public/css/bootstrap.min.css').pipe(uncss({
    html: ['https://carwellness.codebrothers.sk', 'https://carwellness.codebrothers.sk/sluzby', 'https://carwellness.codebrothers.sk/cennik', 'https://carwellness.codebrothers.sk/galeria', 'https://carwellness.codebrothers.sk/kontakt', 'https://carwellness.codebrothers.sk/reklamacia', 'https://carwellness.codebrothers.sk/objednavka']
  })).pipe(gulp.dest('./dist/public/css'));
});

gulp.task('default', ['minify-js', 'watch:js', 'uncss:css']);