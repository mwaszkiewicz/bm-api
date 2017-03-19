const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');

gulp.task('dev:server', function() {
    nodemon({
        script: 'server.js',
        ext: 'js',
        ignore: ['unitTests*']
    });
});

gulp.task('test', function() {
    gulp.src(['unitTests/*.js'])
        .pipe(mocha());
});

gulp.task('watch:test', ['test'], function() {
    gulp.watch('unitTests/*.js', ['test']);
});
