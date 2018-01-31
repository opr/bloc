const webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: {
        'app': [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            './assets/js/react/index.jsx',
            './assets/js/modules/index.js'
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    output: {
        path: path.resolve(__dirname, '/assets/js', 'dist'),
        publicPath: '/assets/js/dist/',
        filename: 'spooky.js'
    },
    module: {
        rules: [
            {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
