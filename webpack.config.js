const webpack = require('webpack'),
  path = require('path'),
  WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    'app': [
      '@babel/polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './assets/js/src/react/index.jsx',
      './assets/js/src/modules/index.js'
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new WriteFilePlugin({test: /^bloc.js$/, force: true})
  ],
  output: {
    path: path.resolve(__dirname, './assets/js', 'dist'),
    publicPath: '/assets/js/dist',
    filename: 'bloc.min.js'
  },
  module: {
    rules: [

      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },

      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
