const webpack = require('webpack');
const path = require('path');
const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SassLintPlugin = require('sass-lint-webpack');
const postcssPresetEnv = require('postcss-preset-env');
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin');

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
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new MiniCssExtractPlugin({
        filename: 'bloc.min.css',
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    entry: {
      bloc: ['./assets/js/src/react/index.jsx',
        './assets/js/src/modules/index.js',
        './assets/styles/scss/bloc.scss'],
      'bloc.serverSide': ['./assets/js/src/serverSideReact/index.jsx']
    },
    output: {
      path: path.join(__dirname, 'assets', 'dist'),
      filename: '[name].min.js',
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
        },
        {
          test: /\.(sc|sa|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: argv.mode === 'development',
              }
            },
            {loader: 'css-loader', options: {sourceMap: true, url: false}},
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.join(__dirname, 'postcss.config.js')
                },
                plugins: () => [postcssPresetEnv()]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                importer: globImporter()
              }
            },
          ],
        }
      ]
    }
  };
};
