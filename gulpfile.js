var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('test', () => {
   gulp.src('test/*.test.js', {read: false})
       .pipe(mocha({report: 'nyan'}));
});

gulp.task('serve', ['style'], function () {
    var options = {
        scripts: 'npm start',
        delayTime: 1,
        env: {
            'PORT': 8000,
            'NODE_ENV': 'development'
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart',function (env) {
            console.log('Restarting...');
        });

});


