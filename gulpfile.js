var gulp = require('gulp');
var gutil = require('gulp-util');
var tsc   = require('gulp-tsc');
var gjade = require('gulp-jade');

gulp.task('default', function(){
    gulp.src(['app.ts'])
        .pipe(tsc())
        .pipe(gulp.dest("."));
    //gulp.src(['jade/index.jade', 'jade/editor.jade'])
    //    .pipe(gjade())
    //    .pipe(gulp.dest("."));
});
