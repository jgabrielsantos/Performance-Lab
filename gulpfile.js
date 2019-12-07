var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');
var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'Gulp',
        message: 'Error: <%= error.message %>'
    })
};
gulp.task('sass', function() {
    gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./build/css'))
});
gulp.task('scripts', function() {
    gulp.src('./js/**/*.js')
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./build/js'))
});
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(['build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
});
gulp.task('watch', function() {
    gulp.watch('./sass/*.scss', gulp.series('sass'));
    gulp.watch('./js/**/*.js', gulp.series('scripts'));
});
gulp.task('default', gulp.parallel('watch', 'browser-sync'));