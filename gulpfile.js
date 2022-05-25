const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const purgecss = require('gulp-purgecss');
const browserSync = require('browser-sync').create();

const styleSRC = './scss/**/*.scss';
const styleDEST = './css';

// compile scss
function style() {
  return gulp
    .src(styleSRC)
    .pipe(sass())
    .pipe(gulp.dest(styleDEST))
    .pipe(browserSync.stream());
}

//watcher
function watch() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
  gulp.watch(styleSRC, style);
  gulp.watch('./*.html').on('change', browserSync.reload);
}

//minify, autoprefixer and purge
function minify() {
  return gulp
    .src(styleSRC)
    .pipe(purgecss({ content: ['*.html'] }))
    .pipe(autoprefixer())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(styleDEST));
}

exports.style = style;
exports.watch = watch;
exports.minify = minify;
