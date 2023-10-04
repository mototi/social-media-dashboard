// initialize modules 
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();

//use dart sass
//sass.compiler = require('dart-sass');

// Sass Task
function scssTask() {
    return src('app/scss/style.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('dist', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask() {
    return src('app/js/script.js', { sourcemaps: true })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(terser())
        .pipe(dest('dist', { sourcemaps: '.' }));
}

// Browsersync Tasks
function browsersyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: '.'
        }, 
        notify: {
            styles: {
                top: 'auto',
                bottom: '0'
            }
        }
    });
    cb();
}
function browsersyncReload(cb) {
    browserSync.reload();
    cb();
}

// Watch Task
function watchTask() {
    watch('*.html', browsersyncReload);
    watch(['app/scss/**/*.scss', 'app/js/**/*.js'], 
    series(scssTask, jsTask, browsersyncReload));
}

//Default Gulp Task
exports.default = series( scssTask, jsTask, browsersyncServe, watchTask);