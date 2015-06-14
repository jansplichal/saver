var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var path = require('path');
var watchLess = require('gulp-watch-less');
var prefix = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var nodemon = require('nodemon')

gulp.task('watch', function() {
  gulp.watch('./public/less/*.less', ['less']);
});

gulp.task('less', function() {
  gulp.src('./public/less/main.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(prefix("last 3 version", "> 1%", "ie 9", "ie 10"), {
      cascade: true
    })
    .pipe(gulp.dest('./public/css'));
});
