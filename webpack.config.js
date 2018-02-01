const webpack = require('webpack'),
    path = require('path'),
    WriteFilePlugin = require('write-file-webpack-plugin');

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
        new webpack.NoEmitOnErrorsPlugin(),
        new WriteFilePlugin({ force: true, test: /^spooky\.js$/ })
    ],
    output: {
        path: path.resolve(__dirname, './assets/js', 'dist'),
        publicPath: './assets/js/dist/',
        filename: 'spooky.js'
    },
    module: {
        rules: [
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
