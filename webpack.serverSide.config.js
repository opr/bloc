const webpack = require('webpack');
const path = require('path');
const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SassLintPlugin = require('sass-lint-webpack');
const postcssPresetEnv = require('postcss-preset-env');


module.exports = (env, argv) => ({
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      test: /\.js/,
      terserOptions: {
        sourceMaps: argv.mode === 'development',
        compress: {
          drop_console: argv.mode !== 'development'
        }
      }
    })]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(argv.mode === 'development' ? 'development' : 'production'),
      'process.env.BABEL_ENV': JSON.stringify(argv.mode === 'development' ? 'development' : 'production'),
      'process.env.SERVER_SIDE': JSON.stringify(argv.mode === 'development' ? 'development' : 'production')
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  entry: {
    'bloc.serverSide' : ['./assets/js/src/serverSideReact/index.jsx']
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
            envName: 'production'
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
});
