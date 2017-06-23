var gulp = require('gulp'),
  sass = require('gulp-sass'),
  webpack = require('webpack-stream'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer'),
  runSequence = require('run-sequence'),
  gutil = require('gulp-util'),
  nodemon = require('gulp-nodemon'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;

// load build configs
var isDist = false;

var libraryConfig = require('./src/build/library.config');
var webpackConfig = require('./src/build/webpack.config');


// base variables
var distPath = './public/assets/dist';
var appEntry = './src/app/app.ts';

var sassIncludePaths = ['./node_modules/foundation-sites/scss'];
var stylesWatch = 'src/styles/**/*.scss';
var tsWatch = 'src/app/**/*.ts';

var reloadWatch = [
  // "wwj/core/static/**/*.html",
  // "wwj/core/static/assets/dist/js/**/*.js",
  // "wwj/templates/**/*.html",
  // "wwj/templates/.components/**/*.html"
];


function swallowError(error) {
  console.log(error.toString());
}

/* build lib */
gulp.task('library:bundle', function () {
  return gulp.src(libraryConfig.jsVendorLibraries)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest(distPath + '/js'));
});

gulp.task('css:bundle', function () {
  return gulp.src(libraryConfig.cssVendorLibraries)
    .pipe(concat('lib.css'))
    .pipe(gulp.dest(distPath + '/css'));
});


/* compile TS & bundle App */
gulp.task('webpack', function () {
  return gulp.src(appEntry)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(distPath + '/js'));
});

/*
 non Webpack TS compile

 var tsProject = ts.createProject('tsconfig.json');
 gulp.task('ts', function () {
 var tsResult = tsProject.src() // instead of gulp.src(...)
 .pipe(sourcemaps.init())
 .pipe(tsProject());
 return tsResult.js
 .pipe(sourcemaps.write('./')) // Now the sourcemaps are added to the .js file
 .pipe(gulp.dest('./'));
 });
 */

/* compile sass task */
gulp.task('sass', function () {
  return gulp.src(stylesWatch)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: sassIncludePaths
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(distPath + '/css'))
    .pipe(reload({
      stream: true
    }));
});

// clean dist path before "gulp dist"
gulp.task('clean', function () {
  return del([
    distPath + '/**/*'
  ]);
});

gulp.task('sass:dist', function () {
  return gulp.src(stylesWatch)
    .pipe(sass({
      includePaths: sassIncludePaths
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(distPath + '/css'));
});

gulp.task('server', ['sass', 'webpack', 'library:bundle', 'css:bundle', 'browser-sync'], function () {

  // watch tasks
  gulp.watch(stylesWatch, ['sass']);
  gulp.watch(tsWatch, ['webpack']);
  gulp.watch(reloadWatch).on('change', reload);

});

gulp.task('dist', function (callback) {
  runSequence(
    'clean',
    ['sass', 'webpack', 'library:bundle', 'css:bundle'],
    callback
  );
});


gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init({
    proxy: "http://localhost:4000",
    port: 3000,
    browser: "google chrome canary",
    notify: true
  });
});


gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: './server/server.js',
    ext: 'js html twig',
    //watch: ['./src/templates/*', './server/*']
  }).on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  }).on('restart', function () {
    console.info("vole restart");
    setTimeout(function () {
    browserSync.reload()

    },500

    )
  });
});


gulp.task('default', ['browser-sync'], function () {
  //gulp.watch("public/scss/*.scss", ['sass']);
  //gulp.watch(['./public/**/*.html'], reload);
  //gulp.watch(['./src/templates/**/*.twig'],reload);
});
