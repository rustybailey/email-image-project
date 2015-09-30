var path = require('path');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

// PATHS
var PATHS = {
    app: __dirname + '/public'
};

module.exports = {
    entry: {
        app: ['./public/core/bootstrap.js']
    },
    output: {
        path: PATHS.app,
        filename: 'bundle.js'
    },
    module: {
       loaders: [
            { test: /\.scss$/, loader: 'style!css!sass?' +
              'includePaths[]=' +
                encodeURIComponent(path.resolve(__dirname, './node_modules'))
            },
            { test: /\.png$/, loader: 'url?limit=100000' },
            { test: /\.jpg$/, loader: 'file' },
            { test: /\.gif$/, loader: 'file' },
            {
              test: /\.html$/,
              loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './public/')) + '/!html'
            },
            {
              test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
              loader: 'url-loader?limit=8192'
            }
       ]
    },
    plugins: [
        new ngAnnotatePlugin({
            add: true,
            single_quotes: true
        })
    ]
};
