#!/usr/bin/env node
var debug = require('debug')('clean');
var app   = require('./app');

app.set('port', process.env.PORT || 4001);


// gulp modules
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	jade = require('gulp-jade'),
	livereload = require('gulp-livereload');


var css = __dirname + '/public/stylesheets',
	js = __dirname + '/public/javascripts',
	fonts = __dirname + '/public/fonts',
	images = __dirname + '/public/images';



// -------------- development --------------
var dev = {
	scssInit  : css + '/scss/*.scss', 		// initial scss processing
	cssDest   : css, 						// css destination
	scssWatch : css + '/**/*.scss', 		// scss watch
	cssReload : css + '/*.css', 			// live-reload watch
};

// compile 
gulp.task('scss', function(){
	gulp.src( dev.scssInit )
		.pipe( sass({errLogToConsole: true}) )
		.pipe( gulp.dest( dev.cssDest ) )
		.pipe(livereload()); 
});
   
// watch (scss for compile, css for livereload)
gulp.task('watch', function(){
	// watch scss
	gulp.watch( dev.scssWatch, ['scss'] );

	// watch css
	// livereload.listen();
	// gulp.watch( dev.cssReload ).on('change', livereload.changed);
});
 
// start express
gulp.task('express', function(){
	var server = app.listen(app.get('port'), function() {
		debug('Express server listening on port ' + server.address().port);
	});
});
 
    
// gulp.task('dev', ['scss', 'express', 'watch'], function(){
gulp.task('dev', ['scss', 'express', 'watch'], function(){
	console.log('gulp successfully started!');
});



// ------------ export
gulp.task('jade', function(){
	return gulp.src( './views/index.jade' )
		.pipe( jade() )
		.pipe( gulp.dest( __dirname ) );
});




var cssPath = {
	// scss source
	init : 'public/stylesheets/scss/*.scss',
	// output destination
	dest : 'public/stylesheets',
	// scss autocompile watch
	watch : 'public/stylesheets/**/*.scss',
	// to watch for livereload
	lr : 'public/stylesheets/*.css'
};

/*// express
gulp.task('express', function(){
	var server = app.listen(app.get('port'), function() {
	  debug('Express server listening on port ' + server.address().port);
	});
})

// css
gulp.task('css', function(){
	return gulp.src( cssPath.init )
		.pipe(sass({errLogToConsole: true}))
		.pipe( gulp.dest( cssPath.dest ) )
})

// livereload
var tinylr;
gulp.task('livereload', function(){
	tinylr = require('tiny-lr')();
	tinylr.listen(35729)
})
 
function notifyLiveReload(event){
	var fileName = require('path').relative(__dirname, event.path);
	
	tinylr.changed({
		body: {
			files: [fileName]
		}
	})
}

// watch
gulp.task('watch', function(){
	gulp.watch( cssPath.watch, ['css'] ) 			// auto compiles scss on save
	gulp.watch( cssPath.lr, notifyLiveReload ) 		// refreshes stylesheet on css change
})



gulp.task('default', ['css', 'express', 'livereload', 'watch'], function(){
	console.log( 'gulp succesfully started!' )
})



gulp.task('jade', function(){
	return gulp.src( './views/index.jade' )
		.pipe( jade() )
		.pipe( gulp.dest( __dirname ) )
})*/