var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload');

// TODO: Create build task and add to postinstall script

gulp.task('develop', function() {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js scss html',
    stdout: false
  }).on('readable', function() {
    this.stdout.on('data', function(chunk) {
      if (/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', ['develop']);
