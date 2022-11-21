const { src, dest, watch, series, parallel } = require ('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');


function browsersync() {
    browserSync.init({
        server: { baseDir: 'app/'},
        notify: false,
        online: true        
    })
}


function task_html () {
    return src ( 'app/*.html')
    .pipe (dest('dist'));
   }


function task_sass () {
    return src ( 'app/sass/*.sass')
    .pipe (concat ( 'styles.sass'))
    .pipe (sass ())
    .pipe (autoprefixer ({
    browsers: [ 'last 2 versions'],
    cascade: false
    }))
    .pipe (cssnano ())
    .pipe (rename ({suffix: '.min'}))
    .pipe (dest('dist/css'));
   }   
function task_css () {
    return src ( 'app/css/*.css')
    .pipe (concat ( 'style.css'))
    .pipe (rename ({suffix: '.min'}))
    .pipe (dest('dist/css'));
   }

function task_scripts() {
    return src('app/js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('dist/js'))
}

function task_imgs() {
    return src ( "app/img/*.+(jpg|jpeg|png|svg)")
    .pipe (imagemin ({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    interlaced: true
    }))
    .pipe (dest('dist/images'))
   }
   

function task_watch() {
    watch ("app/*.html", task_html);
    watch ("app/js/*.js", task_scripts);
    watch ("app/sass/*.sass", task_sass);
    watch ("app/images/*.+(jpg|jpeg|png|gif)", task_imgs);
    watch ("app/**/*.html").on("change", browserSync.reload);
}

exports.browsersync = browsersync;
exports.html = task_html;
exports.sass = task_sass;
exports.css = task_css;
exports.scripts = task_scripts;
exports.imgs = task_imgs;
exports.watch = task_watch;
exports.build = series(task_html, task_sass, task_css, task_scripts, task_imgs);
exports.default = parallel(series(exports.build, browsersync), task_watch);
