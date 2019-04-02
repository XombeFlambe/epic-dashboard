/*********************************************
Task variables
*********************************************/
var gulp = require('gulp'); // Task Runner
var sass = require('gulp-sass'); // SCSS compliler
var csslint = require('gulp-csslint'); // CSS linter
var browserSync = require('browser-sync'); // Browser sync updater
var useref = require('gulp-useref'); // File and Directory Referencer
var gulpIf = require('gulp-if'); // If statement helper
var uglify = require('gulp-uglify'); // JS minifier
var minifyCSS = require('gulp-minify-css'); // CSS minifier
var cache = require('gulp-cache'); // Cacher
var del = require('del'); // Delete helper
var runSequence = require('run-sequence'); // Script run sequencer
var autoprefixer = require('gulp-autoprefixer'); // Auto prefixer for CSS
var nunjucksRender = require('gulp-nunjucks-render'); // HTML Templater
var browserify = require('gulp-browserify'); // JS Modulizer
var rename = require("gulp-rename"); // File renamer
var jshint = require('gulp-jshint'); // JS debugger
var checkCSS = require('gulp-check-unused-css'); // Checks for unused CSS and classes
var plumber = require('gulp-plumber'); // Fixes issue for watch task breaking on code errors

/*********************************************
Gulp task functions
*********************************************/
// Builds the dist directory from the src directory
gulp.task('build', function (callback) {
  runSequence('clean', 'scripts', 'nunjucks','sass', 'useref', 'images', 'fonts', 'uploads', 'plugins', 'js-raw', callback);
});

// Watch Task, auto refreshes the browser when html, scss and js files are edited
gulp.task('watch', ['scripts', 'nunjucks', 'browserSync', 'sass'], function(){
    gulp.watch('src/css/scss/**/*.scss', ['sass']);
    gulp.watch('src/templates/**/*.html', ['nunjucks']);
    gulp.watch('src/pages/**/*.html', ['nunjucks']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

// Watch Task, using gulp command
gulp.task('default', function (callback) {
  runSequence(['scripts', 'nunjucks', 'sass', 'browserSync', 'watch'], callback);
});

// SCSS compiler
gulp.task('sass', function(){
    gulp.src('src/css/scss/**/*.scss') // Gets all files ending with .scss in src/scss and children dirs. Removed 'return' for plumber compatibility
    .pipe(plumber())
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: true
        })) /* Autoprefixes css based on browser coverage, in this case greater than 1% global browser usage */
    .pipe(gulp.dest('src/css/'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// HTML Template modulizer
gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['src/templates/'], { watch: false, lstripBlocks: true, asynch: true });
  return gulp.src('src/pages/**/*.+(html|nunjucks)')
  .pipe(plumber())
  .pipe(nunjucksRender())
  .pipe(gulp.dest('src'));
});

// JS modulizer
gulp.task('scripts', function() {
    gulp.src('src/js/app.js')
        .pipe(plumber())
        .pipe(browserify({
          insertGlobals : false
        }))
        .pipe(rename('main.js'))
        .pipe(gulp.dest('src/js'))
        .pipe(gulp.dest('dist/js')); /* Remove if using uglify */
});

// JS directory builder for non minification
gulp.task('js-raw', function() {
  return gulp.src('src/js/*/**.js')
  .pipe(gulp.dest('dist/js')); /* '!src/js/app.js' */
});

// Browser auto updater
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'src'
        },
    });
});

// Dist build helper plus CSS and JS minifier
gulp.task('useref', function(){
  var assets = useref.assets();

  return gulp.src('src/*.html')
    .pipe(assets)
    .pipe(gulpIf('*.css', minifyCSS())) // Minifies only if it's a CSS file
    .pipe(gulpIf('*.js', uglify())) // Uglifies Javascript files
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist/'));
});

// Media image builder plus minifier
gulp.task('images', function(){
  return gulp.src('src/media/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(gulp.dest('dist/media/images/'));
});

// Media fonts builder
gulp.task('fonts', function() {
  return gulp.src('src/media/fonts/**/*.+(eot|svg|ttf|woff)')
  .pipe(gulp.dest('dist/media/fonts/'));
});

// Media uploads builder
gulp.task('uploads', function() {
  return gulp.src(['src/media/uploads/**/*', '!src/media/uploads/**/*.scc']) // ignore .scc source safe files
  .pipe(gulp.dest('dist/media/uploads/'));
});

// Plugins directory builder
gulp.task('plugins', function() {
  return gulp.src(['src/plugins/**/*', '!src/plugins/**/*.scc']) // ignore .scc source safe files
  .pipe(gulp.dest('dist/plugins/'));
});

// Full directory cleaner
gulp.task('clean', function(callback) {
  del('dist');
  return cache.clearAll(callback);
});

// Directory cleaner but keeps media folder in tact, shortens build time
gulp.task('clean:dist', function(callback){
  del(['dist/**/*', '!dist/media', '!dist/media/**/*'], callback);
});

// JS debugger
gulp.task('jshint', function () {
    gulp.src(['src/js/*.js', 'src/js/views/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Checker for unused CSS
gulp.task('checkcss', function(){
    return gulp.src(['src/*.html', 'src/css/css/modern.css'])
    .pipe(checkCSS({
        ignore: [ 'wysiwyg', /^vendor-/ ]
    }));
});

// CSS Linter
gulp.task('css', function() {
  gulp.src('src/css/css/modern.css')
    .pipe(csslint({
        'shorthand': false,
        'box-sizing': false,
        'adjoining-classes': false,
        'regex-selectors': false,
        'important': false,
        'vendor-prefix': false,
        'compatible-vendor-prefixes': false,
        'gradients': false,
        'unique-headings': false,
        'qualified-headings': false,
        'box-model': false,
        'outline-none': false,
        'text-indent': false,
        'universal-selector': false,
        'unqualified-attributes': false,
        'overqualified-elements': false
        }))
    .pipe(csslint.reporter());
});
