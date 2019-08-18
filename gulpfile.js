const appUrl = 'localhost:8088';
const {src, dest, parallel, watch, task} = require('gulp');
const webpackStream = require('webpack-stream');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const browsersync = require('browser-sync');
const webpackConfig = require('./webpack.config.js');
const webpackConfigServer = require('./webpack.serverSide.config.js');
const webpackConfigDev = webpackConfig(null, {mode: 'development', hot: true});
const webpackConfigProd = webpackConfig(null, {mode: 'production'});
const webpackConfigSass = webpackConfig(null, {mode: 'production', sass: true});
const webpackConfigSassDebug = webpackConfig(null, {mode: 'development', sass: true});
const webpackConfigSsr = webpackConfigServer(null, {mode: 'production'});
const webpackStatic = require('webpack');
const plumber = require('gulp-plumber');
const webserver = require('gulp-webserver');
const bundler = webpackStatic(webpackConfigDev);
const {EventEmitter} = require('events');
const env = require('gulp-env');
const emitter = new EventEmitter();


// Watch Files For Changes
const watchSass = () => watch('assets/styles/scss/**/*.scss', webpackSass);
const watchJs = () => watch('assets/js/src/**/*.+(js|ts|jsx)', webpack);
const watchJsSsr = () => watch('assets/js/src/**/*.+(js|ts|jsx)', webpackSsr);
const watchFiles = parallel(watchJs, watchSass, watchJsSsr);

const webpack = () => {
  env({
    vars: {
      BABEL_ENV: 'production'
    }
  });
  return webpackStream(webpackConfigDev).on('error', e => {emitter.emit('finish'); console.log(e);}).pipe(plumber({
    errorHandler: errorAlert
  }))
    .pipe(dest('./assets/dist/'));
};
const webpackProd = () => {
  env({
    vars: {
      BABEL_ENV: 'production'
    }
  });
  return webpackStream(webpackConfigProd).on('error', e => {emitter.emit('finish'); console.log(e);}).pipe(plumber({
    errorHandler: errorAlert
  }))
    .pipe(dest('./assets/dist/'));
};
const webpackSass = () => {
  env({
    vars: {
      BABEL_ENV: 'production'
    }
  });
  return webpackStream(webpackConfigSass).on('error', e => {emitter.emit('finish'); console.log(e);}).pipe(plumber({
    errorHandler: errorAlert
  }))
    .pipe(dest('./assets/dist/'));
};
const webpackSassDebug = () => {
  env({
    vars: {
      BABEL_ENV: 'production'
    }
  });
  return webpackStream(webpackConfigSassDebug).on('error', e => {emitter.emit('finish'); console.log(e);}).pipe(plumber({
    errorHandler: errorAlert
  }))
    .pipe(dest('./assets/dist/'));
};
const webpackSsr = () => {
  env({
    vars: {
      BABEL_ENV: 'production'
    }
  });
  return webpackStream(webpackConfigSsr).on('error', e => {emitter.emit('finish'); console.log(e);}).pipe(plumber({
    errorHandler: errorAlert
  }))
    .pipe(dest('./assets/dist/'));
};
const webServer = () =>
  src('.').pipe(webserver({port: 8088}));

const browser_sync = () => {
  browsersync({
    open: false,
    notify: false,
    ghostMode: false,
    files: ['./assets/dist/bloc.min.css'],
    proxy: {
      target: appUrl,
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfigDev.output.publicPath,
          stats: {colors: true}
          // http://webpack.github.io/docs/webpack-dev-middleware.html
        }),
        webpackHotMiddleware(bundler)
      ]
    }
  });
};

function errorAlert(error) {
  console.log(error.toString());//Prints Error to Console
  this.emit('end'); //End function
}
const dev = parallel(webpack, webpackSsr, webpackSass, browser_sync, watchFiles);
const build = parallel(webpackProd, webpackSsr, webpackSass);

exports.dev = dev;
exports.build = build;
exports.webpack = webpack;
exports.webServer = webServer;
exports.watch = watchFiles;
exports.webpackSass = webpackSass;
exports.webpackSassDebug = webpackSassDebug;
exports.webpackSsr = webpackSsr;
exports.webpackProd = webpackProd;
exports.browserSync = browser_sync;
exports.default = dev;
