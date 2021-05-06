/* eslint-disable strict */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

// `-p` in `start` npm task makes argv.mode = 'production'
const webpackProd = (env, argv) => merge(common({}), {
    mode: 'production',
    stats: 'verbose',
    devtool: 'source-map',
    optimization: {
        minimize: false,
        runtimeChunk: false,
        usedExports: false,
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /node_modules/,
                    filename: 'vendor.bundle.js',
                    name: 'vendor',
                    priority: -10
                }
            },
            chunks: 'all',
            maxSize: 500000000,
            automaticNameDelimiter: '.'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            __SENTRY_SERVICE_URL__: JSON.stringify('[hidden]'),
            __TEST_MODE__: JSON.stringify(false)
        })
    ]
});

module.exports = webpackProd;
