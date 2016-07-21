var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    autoprefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload');

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        port: 9000,
        livereload: true
    });
});

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(connect.reload())
});

gulp.task('pug', function() {
    return gulp.src('app/pug/**/*.pug')
        .pipe(pug({
            locals: {
                cssPath: '../css/',
                jsPath: '../js/',
                imgPath: '../img/'
            }
        }))
        .pipe(gulp.dest('app'))
        .pipe(connect.reload())
});

gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/pug/**/*.pug', ['pug']);
});
gulp.task('default', ['connect', 'watch','sass','pug']);