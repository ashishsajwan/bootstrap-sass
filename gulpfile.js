var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var uglifycss = require('gulp-uglifycss');
gulp.task('sass', function() {
  //compile scss to css
  gulp.src('sass/cap_styles.scss').pipe(sass()).pipe(uglifycss({
    "maxLineLen": 80,
    "uglyComments": true
  })).pipe(rename('cap_styles.min.css')).pipe(gulp.dest('dist/css'));
  // move fonts to dist/fonts/bootstrap
  gulp.src('bower_components/bootstrap-sass/assets/fonts/bootstrap/*').pipe(gulp.dest('dist/fonts/bootstrap'));
  // move bootCards fonts to dist/fonts
  gulp.src('bower_components/bootcards/dist/fonts/*').pipe(gulp.dest('dist/fonts'));
  return true;
});
//Merge Scripts
gulp.task('js', function() {
  // delete bootstrap that got included as dependency to bootbox.js
  gulp.src('bower_components/bootstrap', {
    read: false
  }).pipe(clean());
  // delete fastclick that got included as dependency to bootbox.js
  gulp.src('bower_components/fastclick', {
    read: false
  }).pipe(clean());
  // delete font-awesome that got included as dependency to bootbox.js
  gulp.src('bower_components/font-awesome', {
    read: false
  }).pipe(clean());
  // move jquery to dist/jquery folder
  gulp.src('bower_components/jquery/dist/jquery.min.js').pipe(gulp.dest('dist/js/jquery'));
  // merge bootstrap | bootbox.js |bootstrap multiselect | bootcards=> cap-bootstrap.js
  gulp.src(['bower_components/bootstrap-sass/assets/javascripts/bootstrap.js', 'bower_components/bootbox.js/bootbox.js', 'bower_components/bootstrap-treeview/dist/bootstrap-treeview.min.js', 'bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js', 'bower_components/bootcards/dist/js/bootcards.js']).pipe(concat('cap-bootstrap.js')).pipe(rename('cap-bootstrap.min.js')).pipe(uglify()).pipe(gulp.dest('dist/js'));
  return true;
});
gulp.task('build', ['sass', 'js']);