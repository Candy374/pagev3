import gulp from 'gulp';
import grommetToolbox from 'grommet-toolbox';

var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');

gulp.task('test-coverage', function (cb) {
  gulp.src(['dist/test.js'])
    .pipe(istanbul()) // Covering files
    .on('finish', function () {
      gulp.src(['test/components/Box.test.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports()) // Creating the reports after tests runned
        .on('end', cb);
    });
});

grommetToolbox(gulp);
