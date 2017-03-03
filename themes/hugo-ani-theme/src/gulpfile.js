var gulp            = require('gulp');
var pug             = require('gulp-pug');
var stylus          = require('gulp-stylus');
var rupture         = require('rupture');
var poststylus      = require('poststylus');
var lost            = require('lost');
var changed         = require('gulp-changed');
var runSequence     = require('run-sequence');
var browserSync     = require('browser-sync');
var jshint          = require('gulp-jshint');
var uglify          = require('gulp-uglify');
var pleeease        = require('gulp-pleeease');
var iconfont        = require('gulp-iconfont');
var consolidate     = require("gulp-consolidate");
var plumberNotifier = require('gulp-plumber-notifier');
var bower           = require('gulp-bower');
var babel           = require('gulp-babel');
var tinypng 		= require('gulp-tinypng-extended');
var fs              = require('fs');

var config = {
	is_minified: true,
	hugoRoot   		: '../../../',
	themes	   		: '../../../themes/',
	currentTheme    : '../../../themes/hugo-ani-theme/'
}

var path = {
	
	frontend   		: '',
	src_html   		: 'preprocessors/pug/',
	src_css    		: 'preprocessors/stylus/',
	src_js     		: 'preprocessors/js/',
	src_sprite 		: 'img/sprite/*.png',
	src_img    		: 'img/',
	src_site_img	: 'site-images/',
	src_libs   		: 'libs/**/*.js',
	dist_html  		: config.currentTheme + 'layouts/html/',
	dist_css   		: config.currentTheme + 'static/css/',
	dist_js    		: config.currentTheme + 'static/js/',
	dist_img   		: config.currentTheme + 'static/img/',
	dist_site_img   : config.hugoRoot + 'static/img/',
	js_hint    		: [config.currentTheme + 'static/js/**/*.js', 
						config.currentTheme + '!static/js/libs/**/*.js']
};

gulp.task('html', function() {
	gulp.src([
		path.src_html + '*.pug',
		path.src_html + '**/*.pug',
		'!' + path.src_html + '_**/*.pug',
		'!' + path.src_html + '/**/_**/*.pug',
		'!' + path.src_html + '/**/_*.pug'
		]).pipe(plumberNotifier())
		.pipe(pug({
			pretty : true//!config.is_minified
		}))
		.pipe(gulp.dest(path.dist_html));
});

gulp.task('css', function () {
	return gulp.src([
		path.src_css + '**/*.styl',
		'!' + path.src_css + '**/**/_**/*.styl',
		'!' + path.src_css + '_**/*.styl',
		'!' + path.src_css + '**/_*.styl'
	])
	.pipe(plumberNotifier())
	.pipe(stylus({
		use: [
			rupture(),
			poststylus(['lost'])
		]
	}))
	.pipe(pleeease({minifier:config.is_minified}))
	.pipe(gulp.dest(path.dist_css));
});

gulp.task('js:babel', function(cb) {
		return gulp.src([
		path.src_js + '**/*.js',
		'!' + path.src_js + '_**/*.js',
		'!' + path.src_js + '**/_*.js'
	])
	.pipe(plumberNotifier())
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(jshint.reporter('fail'))
	.pipe(babel({
			presets: ['es2015']
	}))
	.pipe(uglify({
		mangle  : false,
		compress: {
			drop_console: false,
			drop_debugger: true
		},
		output: { beautify: !config.is_minified }
	}))
	.pipe(gulp.dest(path.dist_js));
});

gulp.task('imagemin:site', function () {
    gulp.src(path.src_site_img + '**/*.{png,jpg,jpeg}')
		.pipe(changed(path.dist_site_img))
    	.pipe(plumberNotifier())
        .pipe(tinypng({
            key: 'zPOzSBjC0Gdz4NJ2D4eg9M_3-GfRufei',
            sigFile: 'images/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest(path.dist_site_img));
});

gulp.task('imagemin:theme', function () {
	gulp.src(path.src_img + '**/*.{png,jpg,jpeg}')
		.pipe(changed(path.dist_img))
    	.pipe(plumberNotifier())
        .pipe(tinypng({
            key: 'zPOzSBjC0Gdz4NJ2D4eg9M_3-GfRufei',
            sigFile: 'images/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest(path.dist_img));

	gulp.src(path.src_img + '**/*.svg')
    	.pipe(gulp.dest(path.dist_img));
});

gulp.task('fonts:compile', function(cb){
	var dirList = []
	fs.readdirSync(path.frontend +  "fonts/").forEach(function(file){
		if(/^[^_]*$/g.test(file)){
			dirList.push(file)
		}
	});
	return gulp.src(path.frontend + '/fonts/_template/fonts.styl')
		.pipe(consolidate('lodash', { dirList: dirList }))
		.pipe(gulp.dest(path.src_css));
});

gulp.task('icons:compile', function(cb){
	return gulp.src(path.frontend + '/icons/*.svg')
		.pipe(iconfont({
			normalize: true,
			fontName: 'iconFonts-webfont',
			appendUnicode: false
		}))
		.on('codepoints', function(codepoints, options) {
			gulp.src(path.frontend + '/icons/_template/icons.styl') //Template
			.pipe(consolidate('lodash', {
				glyphs: codepoints,
				fontName: 'iconFonts'
			}))
			.pipe(gulp.dest(path.src_css + '/_helpers'));
		})
		.pipe(gulp.dest(path.frontend + '/fonts/iconFonts'));
});

gulp.task('copy:fonts', function() {
	return gulp.src(
			path.frontend + 'fonts/**/*.*',
				{ base : path.frontend })
		.pipe(gulp.dest(path.dist_html));
});

gulp.task('js:copylibs', function() {
	return gulp.src(
			path.src_libs,
				{ base : path.frontend })
		.pipe(gulp.dest(path.dist_js + 'libs/'));
});

gulp.task('browserSync', function(){
	return browserSync({
		notify: true,
		server: {
			baseDir : [path.dist_html]
		}
	});
});

gulp.task('js', function(cb){
	runSequence('js:babel', 'js:copylibs', cb)
});

gulp.task('watch', function() {
	gulp.start('browserSync');
	gulp.watch([path.src_html + '**/*.pug'], ['html', browserSync.reload]);
	gulp.watch([path.src_css + '**/*.styl'], ['css', browserSync.reload]);
	gulp.watch([path.src_js + '**/*.js'], ['js', browserSync.reload]);
});

gulp.task('fonts', function(cb){
	runSequence('fonts:compile', 'css', 'copy:fonts', cb)
});

gulp.task('icons', function(cb){
	runSequence('icons:compile', 'fonts:compile', 'css', 'copy:fonts', cb)
});

gulp.task('imagemin', function(cb){
	runSequence('imagemin:site', 'imagemin:theme', cb)
});

gulp.task('bower', function() {
	return bower();
});

gulp.task('default', function(cb) {
	runSequence('bower', 'html', 'js', 'css', 'imagemin', 'fonts', 'icons', cb);
});