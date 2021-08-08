/* eslint-disable no-console */
/* global __dirname, process, module */
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common({ DEV: true, TARGET: 'localhost' }), {
    mode: 'development',
    devtool: 'source-map',
    stats: 'summary',
    optimization: {
        runtimeChunk: true,
        usedExports: false,
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        open: true,
        hot: false,
        inline: true,
        onListening: (server) => {
            console.log('Listening on address:', server.listeningApp.address());
        },
        index: 'index.html',
        historyApiFallback: true,
        allowedHosts: [
            'localhost',
            'localhost:3000'
        ],
        // contentBase: path.resolve(__dirname, '..', './dist'),
        host: '0.0.0.0',
        public: 'http://localhost:3000',
        port: 3000
    },
    cache: {
        type: 'memory'
    },
    plugins: [
        new webpack.DefinePlugin({
            __SENTRY_SERVICE_URL__: JSON.stringify('[hidden]'),
            __TEST_MODE__: JSON.stringify(false)
        })
    ]
});
