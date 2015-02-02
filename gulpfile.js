'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var karma = require('karma').server;

var paths = {
  karmaConf: __dirname + '/karma.conf.js',
  src: 'charming.js',
  test: 'test/*.js'
};

var defaultTasks = ['lint', 'test', 'dist'];

gulp.task('lint', function() {
  return gulp.src([].concat(__filename, paths.karmaConf, paths.src, paths.test))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function(cb) {
  karma.start({
    configFile: paths.karmaConf,
    singleRun: true
  }, cb);
});

gulp.task('dist', function() {
  return gulp.src(paths.src)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', defaultTasks, function() {
  gulp.watch([].concat(paths.karmaConf, paths.src, paths.test), defaultTasks);
});

gulp.task('default', defaultTasks);
