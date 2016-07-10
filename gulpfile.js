var gulp = require("gulp"),
	watch = require('gulp-watch'),
	rimraf = require('rimraf'),
	uglify = require("gulp-uglify"),
	server = require("gulp-server-livereload"),
	stylus = require('gulp-stylus'), 
	prefix = require('gulp-autoprefixer'),
	wiredep = require('wiredep').stream,
	useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-minify-css')
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

gulp.task('js:css:build', function () {
	gulp.start('clean');
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('build'));
});

gulp.task("bower", function() {
	return gulp.src("app/*.html")
		.pipe(wiredep())
		.pipe(gulp.dest("app"));
});

gulp.task('image:build', function() {
	gulp.src("app/img/**/*.*")
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()],
			interlaced: true
		}))
		.pipe(gulp.dest("build/img"));
})

gulp.task("fonts:build", function() {
	gulp.src("app/fonts/**/*.*")
		.pipe(gulp.dest("build/fonts"))
});

gulp.task('watch', function() {
	watch("app/js/**/main.js", function() {
		gulp.start('js:build');
	});

	watch("app/stylus/**/*.styl", function(event, cb) {
		gulp.start('style');
	});

	watch("bower.json", function(event, cb) {
		gulp.start('bower');
	});

	watch("app/img/**/*.*", function(event, cb) {
		gulp.start('image:build');
	});

	watch("app/fonts/**/*.*", function(event, cb) {
		gulp.start('fonts:build');
	});
});

gulp.task('clean', function(cb) {
	rimraf("./build", cb);
});

gulp.task("server", function() {
	gulp.src('app')
		.pipe(server({
			livereload: true,
			defaultFile: 'index.html',
			open: true
		}));
});

gulp.task("style", function() {
	gulp.src('app/stylus/**/*.styl')
		.pipe(stylus())
		.pipe(prefix({
			browsers: ['last 15 versions']
		}))
		.pipe(gulp.dest('app/css'));
});

gulp.task("build", ["js:css:build", "image:build", "style", "fonts:build"]);

gulp.task("default", ['build', 'server', 'watch']);
