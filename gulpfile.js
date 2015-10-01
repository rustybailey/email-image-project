var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload'),
  gutil = require('gulp-util'),
  webpack = require('webpack'),
  webpackConfig = require('./webpack.config.js');

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

// Production build
gulp.task('build', function(callback) {
  // Add uglify plugin
  webpackConfig.plugins = webpackConfig.plugins.concat(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        dead_code: false
      }
    })
  );

  // run webpack
  webpack(webpackConfig, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('default', ['develop']);
