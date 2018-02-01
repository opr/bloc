let appUrl = 'localhost:8080',
    gulp = require('gulp'),
    sassLint = require('gulp-sass-lint'),
    plumber = require('gulp-plumber'),
    cssmin = require('gulp-cssmin'),
    sass = require('gulp-sass'),
    webpackStream = require('webpack-stream'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    cssimport = require('gulp-cssimport'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    sassGlobbing = require('gulp-sass-glob'),
    browsersync = require('browser-sync'),
    webpackConfig = require('./webpack.config.js'),
    webpackStatic = require('webpack'),
    env = require('gulp-env'),
    bundler = webpackStatic(webpackConfig);

// Watch Files For Changes
gulp.task('watch', () => {
    gulp.watch('assets/styles/scss/**/*.scss', ['sass:lint', 'sass:compile']);
    gulp.watch('assets/styles/js/**/*.js*', ['webpack:build']);
});

gulp.task('browser-sync', function () {
    browsersync({
        open: false,
        notify: true,
        ghostMode: {
            clicks: false,
            forms: true,
            scroll: false
        },
        proxy: {
            target: appUrl,
            middleware: [
                webpackDevMiddleware(bundler, {
                    publicPath: webpackConfig.output.publicPath,
                    stats: {colors: true}
                    // http://webpack.github.io/docs/webpack-dev-middleware.html
                }),
                webpackHotMiddleware(bundler)
            ]
        }
    });
});

gulp.task('webpack:build', () => {
    env({
        vars: {
            BABEL_ENV: 'production'
        }
    });
    return gulp.src('./assets/js/react/ddd.jsx')
        .pipe(webpackStream(require('./webpack.production.config')))
        .pipe(gulp.dest('./assets/js/dist/'));
});

gulp.task('sass:lint', () => {
    return gulp.src([
        '!assets/styles/scss/config/_reset.scss',
        '!assets/styles/scss/config/_variables.scss',
        '!assets/styles/scss/config/_fonts.scss',
        '!assets/styles/scss/mixins/_font-size.scss',
        '!assets/styles/scss/mixins/_rgba.scss',
        'assets/styles/scss/**/*.scss'
    ])
        .pipe(sassLint({
            options: {
                formatter: 'stylish',
                'max-warnings': 1
            },
            rules: {
                'no-ids': 2, // Severity 0 (disabled)
                'no-css-comments': 0,
                'variable-name-format': 0,
                'final-newline': 0,
                'no-important': 0,
                'no-mergeable-selectors': 1, // Severity 1 (warning)
                'pseudo-element': 0,
                'placeholder-in-extend': 0,
                'no-url-domains': 0,
                'no-url-protocols': 0,
                'mixins-before-declarations': 0,
                'property-sort-order': 0
            }
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task('sass:compile', ['sass:lint'], () => {

    return gulp.src('assets/styles/scss/**/*.scss')
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(sassGlobbing())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('assets/styles/css/'))
        .pipe(browsersync.stream())
        .pipe(cssimport())
        .pipe(cssmin({processImport: true}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/styles/css'));
});

gulp.task('default', ['sass:lint', 'sass:compile', 'browser-sync', 'webpack:build', 'watch']);
gulp.task('build', ['sass:lint', 'sass:compile', 'webpack:build']);

function errorAlert(error) {
    console.log(error.toString());//Prints Error to Console
    this.emit("end"); //End function
}