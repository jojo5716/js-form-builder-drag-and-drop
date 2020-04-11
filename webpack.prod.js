const path = require('path');
const webpack = require('webpack');
const packageJSON = require('./package.json');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const reactExternal = {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
};

const reactDOMExternal = {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom'
};

const ENTRY_POINTS = {
    index: ['./src/index.js']
};

const OUTPUT_CONFIG = {
    // An absolute path to the desired output directory.
    path: path.resolve(__dirname, 'dist/'),

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
        })
    ],
    externals: {
        'react': reactExternal,
        'react-dom': reactDOMExternal
    }
});
