const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    devtool: 'source-map',
    entry: {
        'simple.component': './src/simple.component'
    },
    output: {
        path: __dirname + "/bunndle",
        filename: "[name].js",
        publicPath: "bundle/"
    },
    resolve: {
        extensions: ['.ts', '.css', '.html']
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'raw-loader' },
            { test: /\.html$/, loaders: ['html-loader'] },
            { test: /\.ts$/, loaders: ['awesome-typescript-loader'], exclude: /node_modules/ }
        ]
    },
    plugins: [ ]
};
