const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require("path");

function root(__path) {
    return path.join(__dirname, __path);
}

module.exports = {
    entry: {
        'simple.component': './src/simple.component'
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        publicPath: "dist/"
    },
    resolve: {
        extensions: ['.ts', '.js', '.css',]
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                use: [{ loader: 'awesome-typescript-loader' }],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            { test: /\.css$/, loader: 'raw-loader' },
            { test: /\.html$/, loaders: ['html-loader'] },
        ]
    },
    plugins: [

    ]
};
