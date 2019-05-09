const webpack = require('webpack');
const path = require('path');
const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SassLintPlugin = require('sass-lint-webpack');
const postcssPresetEnv = require('postcss-preset-env');


module.exports = (env, argv) => {
  console.log(argv.mode);
  return {
    devServer: {
      port: 3000,
      //comment this out to not use with another back end like iis
      /*proxy: {
        path: '/',
        target: 'http://127.0.0.1:5080'
      },*/
      host: '0.0.0.0'
    },
    optimization: {
      minimizer: argv.mode === 'development' ? [] : [new TerserPlugin({
        test: /\.jsx?/,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })],
      minimize: argv.mode !== 'development'
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.SERVER_SIDE': JSON.stringify(true)
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    entry: [
      './assets/js/src/serverSideReact/index.jsx',
    ],
    output: {
      path: path.join(__dirname, 'assets', 'dist'),
      filename: 'bloc.serverSide.min.js',
      publicPath: '/assets/dist'
    },
    module: {
      rules: [
        {
          test: /\.(jsx?)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              envName: argv.mode === 'development' ? 'development' : 'production'
            }
          },
          resolve: {
            extensions: ['.js', '.jsx']
          }
        },
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          exclude: /node_modules|.*vendor.*/,
          loader: 'eslint-loader'
        }
      ]
    }
  };
};
