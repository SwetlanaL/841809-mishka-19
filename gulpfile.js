'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;

gulp.task('clean', function () {
  return del('build');
});

gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('css', function () {
  return gulp.src('source/less/style.less')
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(less())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(csso())
  .pipe(rename('style.min.css'))
  .pipe(sourcemap.write('.'))
  .pipe(gulp.dest('build/css'))
  .pipe(server.stream());
});

gulp.task('webp', function () {
  return gulp.src('source/img/content-img/*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img/content-img'));
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupNumericValues: { floatPrecision: 1 } }
        ]
      })
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('sprite', function () {
  return gulp.src('source/img/sprite/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img/sprite'));
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('scripts', function () {
  return pipeline(
    gulp.src('source/js/*.js'),
    uglify(),
    gulp.dest('build/js')
  );
});

gulp.task('server', function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/less/**/*.less', gulp.series('css'));
  gulp.watch('source/img/sprite/*.svg', gulp.series('sprite', 'html', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('build', gulp.series('clean', 'copy', 'css', 'images', 'webp', 'scripts', 'sprite', 'html'));
gulp.task('start', gulp.series('build', 'server'));
