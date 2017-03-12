var gulp = require('gulp');
var webserver = require('gulp-webserver');
 
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
gulp.task('default', [ 'webserver']);