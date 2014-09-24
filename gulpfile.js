var gulp = require('gulp');
var gutil = require('gulp-util');
var tsc   = require('gulp-tsc');

gulp.task('default', function(){
    gulp.src(['server.ts', 'app/models/*.ts', 'app/routes/*.ts' ])
        .pipe(tsc())
        .pipe(gulp.dest("."));
});
