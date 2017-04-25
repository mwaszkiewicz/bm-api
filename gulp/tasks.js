const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');

gulp.task('dev:server', ['set-dev-env', 'nodemon'] );

gulp.task('set-dev-env', function() {
   return process.env.NODE_ENV = 'development';
});

gulp.task('nodemon', function() {
    nodemon({
        script: 'server.js',
        ext: 'js',
        ignore: ['unitTests*']
    });
});

gulp.task('watch:test', ['test'], function() {
    gulp.watch('unitTests/*.js', ['test']);
});

gulp.task('test', function() {
    gulp.src(['unitTests/*.js'])
        .pipe(mocha());
});
