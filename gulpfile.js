'use strict';

var path = require('path');
var gulp = require('gulp');
var argv = require('yargs').argv;

/**
 * Load all gulp plugins and make them accessible on the $ variable.
 * This loads all npm modules defined in the package.json that start with
 * `gulp-`.
 * @type {Object}
 */
var $ = require('gulp-load-plugins')();

/**
 * Settings for project.
 * @type {Object}
 */
var settings = {
  name: {
    dist: 'chartbeat-angular',
    module: 'cb'
  },
  folder: {
    dist: 'dist/'
  },
  files: {
    src: 'src/**/*.js',
    utils: 'utils/*.js',
    templates: [
      'src/**/*.html',
      '!src/**/example/*.html'
    ]
  }
};

/**
 * Have default task run the build task.
 */
gulp.task('default', ['build']);

/**
 * Build assets for production.
 */
gulp.task('build', [
  'clean',
  'jshint',
  'less',
  'scripts',
  'ngtemplates',
  'uglify',
  'clean:templates'
]);

/**
 * Cleans all compiled assets.
 */
gulp.task('clean', function() {
  return gulp.src([
    settings.folder.dist
  ], {read: false}).pipe($.clean());
});

/**
 * JSHint all JS files.
 * Stop task if any errors are found.
 */
gulp.task('jshint', function () {
  return gulp.src([
      settings.files.src,
      settings.files.utils
    ])
    // .pipe($.debug({verbose: false})) // Uncomment to see every file
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
    .pipe($.size());
});

/**
 * Compile LESS to CSS, minify it.
 */
gulp.task('less', ['clean', 'jshint'], function () {
  return gulp.src([
      'src/components/**/*.less'
    ])
    .pipe($.less({
      cleancss: true
    }))
    .pipe($.minifyCss())
    .pipe($.concat(settings.name.dist + '.css'))
    .pipe(gulp.dest(settings.folder.dist));
});

/**
 * This task points to the actual django template file and reads the block of
 * .js script tags to find which scripts to include in the compiled file.
 */
gulp.task('scripts', ['jshint', 'clean'], function() {
  return gulp.src([
      settings.files.src,
      '!src/**/tests/*.js'
    ])
    .pipe($.ngmin())
    .pipe($.concat(settings.name.dist + '.js'))
    .pipe(gulp.dest(settings.folder.dist))
    .pipe($.size());
});

/**
 * Pre-warm the angular template cache.
 */
gulp.task('ngtemplates', ['clean', 'scripts'], function() {
  return gulp.src(settings.files.templates)
    .pipe($.angularTemplatecache({
      module: settings.name.module,
      base: function(file) {
        // Each file is a vinyl object (https://github.com/wearefractal/vinyl)
        // and the path property is the full path to the file.
        // We're stripping everything up to /components/ here so it puts
        // the file in the cache correctly.
        return file.path.replace(/^(.*)\/components\//, '');
      }
    }))
    .pipe(gulp.dest(settings.folder.dist))
    .pipe($.size());
});

/**
 * Uglifies and concatenates all files ready for deploy.
 */
gulp.task('uglify', ['scripts', 'ngtemplates'], function() {
  return gulp.src(path.join(settings.folder.dist, '*.js'))
    .pipe($.uglify())
    .pipe($.concat(settings.name.dist + '.js'))
    .pipe(gulp.dest(settings.folder.dist))
    .pipe($.size());
});

/**
 * Cleans template files created when compiling files.
 */
gulp.task('clean:templates', ['uglify'], function() {
  return gulp.src([
    path.join(settings.folder.dist, 'templates.js')
  ], {read: false}).pipe($.clean());
});

/**
 * Config object for test tasks.
 * @type {Object}
 */
var testConfig = {
  karma: {
    configFile: 'karma.conf.js',
    action: 'run',
    browsers: ['PhantomJS'],
    singleRun: true
  },
  unit: [
    'bower_components/angular/angular.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'utils/*.js',
    'src/components/{,*/}*.html',
    'src/components/{,*/}*.less',
    'src/**/*.js'
  ]
};

// If you set the --watch flag then we keep the browser open
// so you can watch the tests.
if (argv.watch) {
  testConfig.karma.action = 'watch';
  testConfig.karma.singleRun = false;
  testConfig.karma.browsers = ['PhantomJS'];
}

/**
 * Set-up unit test task.
 *
 * Additionally you can watch tests via using the `--watch` flag.
 *   gulp test:unit --watch
 */
gulp.task('test:unit', function() {
  return gulp.src(testConfig.unit)
    // .pipe($.debug({verbose: false})) // Uncomment to see every file
    .pipe($.karma(testConfig.karma));
});

/**
 * Meta task to run all tests.
 */
gulp.task('test', ['test:unit']);
