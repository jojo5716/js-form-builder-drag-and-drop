const path = require('path');
const webpack = require('webpack');
const packageJSON = require('./package.json');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.js');

const ENTRY_POINTS = {
    index: ['./example/index.js']
};

const OUTPUT_CONFIG = {
    // An absolute path to the desired output directory.
    path: path.resolve(__dirname, 'deploy/builds/'),

    // A filename pattern for the output files
    filename: '[name].js',

    // IMPORTANT!: This is the name of the global variable exported in browsers
    // Change it for the name you want your component to have as window.NAME
    library: 'FormBuilderDragAndDrop',

    libraryTarget: 'umd'
};

module.exports = merge(common, {
    mode: 'production',
    entry: ENTRY_POINTS,
    output: OUTPUT_CONFIG,
    plugins: [
        new webpack.DefinePlugin({
            // removes a lot of debugging code in React
            'process.env': {
                BROWSER: true,
                VERSION: JSON.stringify(packageJSON.version)
            }
        }),
        new HtmlWebpackPlugin({
            hash: true,
            filename: './index.html',
            template: './deploy/index.html'
        })
    ]
});
