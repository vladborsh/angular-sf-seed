var gulp = require('gulp');
var webserver = require('gulp-webserver');
var zip = require('gulp-zip');
/* Run server */
gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      directoryListing: {
      	enable: true,
        path:   'app'
      },
      open: true,
      https: true
    }));
});
/* Archire application */
gulp.task('zip-app', function() {
  gulp.src('app/*')
    .pipe(zip('client-includes.zip'))
    .pipe(gulp.dest('build'))
  }
);
/* Archire vendor scripts application */
gulp.task('zip-vendor', function() {
  gulp.src('b_components/**/*')
    .pipe(zip('vendor-includes.zip'))
    .pipe(gulp.dest('build'))
  }
);
/* Run server on default */
gulp.task('default', [ 'webserver']);