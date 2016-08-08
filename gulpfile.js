var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('sass', function() {
  gulp.src('sass/app.scss').pipe(sass()).pipe(gulp.dest('dist/css'));
  gulp.src('bower_components/bootstrap-sass/assets/fonts/bootstrap/*').pipe(gulp.dest('dist/fonts/bootstrap'));
  return true;
});
gulp.task('js', function() {
  gulp.src('bower_components/bootstrap-sass/assets/javascripts/*.js').pipe(gulp.dest('dist/js'));
  gulp.src('bower_components/jquery/dist/jquery.min.js').pipe(gulp.dest('dist/js/jquery'));
  return false;
});
gulp.task('build', ['sass', 'js']);