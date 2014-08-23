var gulp = require('gulp');
var jshint = require('gulp-jshint');
var karma = require('gulp-karma');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var uglify = require('gulp-uglify');

var paths = {
  src: ['src/*.js'],
  test: ['test/spec/**/*.spec.js'],
  coverage: 'coverage/',
  dist: 'dist/'
};

gulp.task('lint', function() {
  return gulp.src([__filename].concat(paths.src).concat(paths.test))
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function() {
  return gulp.src([paths.coverage, paths.dist], { read: false })
    .pipe(plumber())
    .pipe(rimraf());
});

gulp.task('dist', ['clean'], function() {
  return gulp.src(paths.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.dist))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('test', function() {
  return gulp.src(paths.src.concat(paths.test))
    .pipe(plumber())
    .pipe(karma({ configFile: 'test/karma.conf.js' }))
    .on('error', function(err) { throw err; });
});

gulp.task('default', [
  'lint',
  'dist',
  'test'
]);
