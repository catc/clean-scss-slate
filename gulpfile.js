 
// gulp modules
var gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	sass = require('gulp-sass');
 
 
// public folder paths
var css 	  = __dirname + '/public/css';
 
 
// -------------- development --------------
 
var dev = {
	scssInit  : css + '/scss/*.scss', 		// initial scss processing
	cssDest   : css, 						// css destination
	scssWatch : css + '/**/*.scss', 		// scss watch
	cssReload : css + '/*.css', 			// live-reload watch
};
 
// start express
gulp.task('express', function(){
	require('./bin/www');
});
 
 
gulp.task('watch', function(){
	// watch scss for compilation to css
	gulp.watch( dev.scssWatch, ['scss'] );
 
	// watch css for livereload
	livereload.listen();
	gulp.watch( dev.cssReload ).on('change', livereload.changed);
});
 
 
// compile scss
gulp.task('scss', function(){
	gulp.src( dev.scssInit )
		.pipe( sass({errLogToConsole: true}) )
		.pipe( gulp.dest( dev.cssDest) );
});

gulp.task('dev', ['express', 'watch']);