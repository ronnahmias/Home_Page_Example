'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    nano = require('gulp-cssnano'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync').create();

// require( 'es6-promise' ).polyfill();

function message(done) {
    console.log('Gulp is running...');
    done();
}
// List al your SASS files HERE
let scss_files = [
    //'assets/styles/main-rtl.scss',
    'assets/styles/main-ltr.scss'
];

function styles(done) {

    gulp.src(scss_files)
        .pipe(sourcemaps.init())
        .pipe(sass()
            .on('error', function(err) {
                gutil.log(
                    'Error found:\n\x07',
                    gutil.colors.red(err.message)
                );
            })
        )
        .pipe(autoprefixer())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream())
    done();
}


// List all your JS files HERE
let js_files = [
    //'assets/scripts/**/*.js'
];

function scripts(done) {

    gulp.src(js_files)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream())
    done();
}

function scriptsMin(done) {
    gulp.src(js_files)

    .pipe(concat('main.min.js'))
        .pipe(uglify())
        .on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('dist/scripts'))
    done();
}

let img_files = [
    'assets/images/**/*'
];

function images(done) {
    gulp.src(img_files)
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream())
    done();
}

function imagesMin(done) {

    gulp.src(img_files)
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            use: [imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()]
        }))
        .pipe(gulp.dest('dist/images'));
    done();
}


let font_files = [
    // 'node_modules/font-awesome/fonts/*',
    'assets/fonts/**/*'
];

function fonts(done) {

    gulp.src(font_files)
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream());
    done();
}

function fontsMin(done) {

    gulp.src(font_files)
        .pipe(gulp.dest('dist/fonts'));
    done();
}


gulp.task('message', message);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('scripts-min', scriptsMin);
gulp.task('images', images);
gulp.task('images-min', imagesMin);

gulp.task('fonts', fonts);
gulp.task('fonts-min', fontsMin);


function watch_files() {
    gulp.watch('assets/styles/**/*', styles);
    gulp.watch('assets/scripts/**/*', scripts);
    gulp.watch('assets/fonts/**/*', fonts);
}

gulp.task('watch', gulp.series(watch_files));