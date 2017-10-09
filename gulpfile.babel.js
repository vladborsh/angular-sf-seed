import gulp            from 'gulp';
import webserver       from 'gulp-webserver';
import zip             from 'gulp-zip';
import rename          from 'gulp-rename';
import template        from 'gulp-template';
import yargs           from 'yargs';
import path            from 'path';
import fs              from 'fs';
import archiver              from 'archiver';
import { inject, cap } from './gulp/component';
import log             from './gulp/log';
import DeploymentService from './gulp/deploy';

/* Run server */
gulp.task('webserver', function() {
  gulp.src('dest')
    .pipe(webserver({
      livereload: true,
      directoryListing: {
      	enable: true,
        path:   'dest'
      },
      open: true,
      https: true
    }));
});

/* Archire application */
gulp.task('zip-app', function() {
  gulp.src('app/**/*')
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

gulp.task('component', () => {
  const name = yargs.argv.name;
  const parentPath = yargs.argv.parent || '';
  const destPath = path.join('public/components', parentPath, name);
  inject(name)
  .then(
    () => {
      return gulp.src(path.join(__dirname, '', 'generator/component/**/*.**'))
        .pipe(template({
          name: name,
          upCaseName: cap(name)
        }))
        .pipe(rename((path) => {
          path.basename = path.basename.replace('seed', name);
        }))
        .pipe(gulp.dest(destPath));
    }
  )
});

gulp.task('zip', function() {
  let srv = new DeploymentService( fs, archiver, log );
  srv.createFolderStructure()
    .then( () => { srv.zipBundles() } )

});

/* Run server on default */
gulp.task('default', [ 'webserver']);