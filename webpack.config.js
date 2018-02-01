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
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new WriteFilePlugin({ force: true, test: /^bloc\.js$/ })
    ],
    output: {
        path: path.resolve(__dirname, './assets/js', 'dist'),
        publicPath: './assets/js/dist/',
        filename: 'bloc.js'
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
