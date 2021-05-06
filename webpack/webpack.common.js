/* eslint-disable no-console */
/* global __dirname, require, module */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const pkg = require('./../package.json');

const distPath = path.resolve(__dirname, '..', 'dist');
const srcPath = path.resolve(__dirname, '..', 'app');

const LABELS = {
    hosting: {
        endpoints: ['test.de'],
        color: '#ffffff'
    },
};

// https://github.com/itgalaxy/favicons#usage
const faviconTypes = {
    android: false,
    appleIcon: [
        'apple-touch-icon-120x120.png',
        'apple-touch-icon-152x152.png',
        'apple-touch-icon-180x180.png',
        'apple-touch-icon-60x60.png',
        'apple-touch-icon-76x76.png'
    ],
    appleStartup: false,
    coast: false,
    favicons: ['favicon-16x16.png', 'favicon-32x32.png', 'favicon-96x96.png', 'favicon.ico'],
    firefox: false,
    windows: false,
    yandex: false
};

const allTemplates = [].concat.apply(
    [],
    Object.keys(LABELS).map((labelName) => {
        return [
            {
                template: path.resolve(__dirname, '..', 'app/index.live.webpack.tmp.html'),
                filename: `index.live.${labelName}.html`
            }
        ];
    })
);

module.exports = ({ DEV = false, TARGET = 'localhost', AUTOFIX = false }) => ({
    entry: {
        preApp: path.resolve(__dirname, '..', './app/scripts/preApp.js'),
        platform: path.resolve(__dirname, '..', './app/import.ts')
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: [path.resolve(srcPath, 'index.live.webpack.tmp.html')],
                include: [
                    path.resolve(srcPath, 'atomic-components/'),
                    path.resolve(srcPath, 'components/'),
                    path.resolve(srcPath, 'error/')
                ],
                oneOf: [
                    {
                        // require('./foo.html?external')
                        resourceQuery: /external/,
                        type: 'asset/resource',
                        generator: {
                            filename: '[path][name][ext]'
                        }
                    },
                    {
                        // require('./foo.html')
                        options: {
                            esModule: false,
                            sources: {
                                urlFilter: (attribute, value, resourcePath) => {
                                    // The `attribute` argument contains a name of the HTML attribute.
                                    // The `value` argument contains a value of the HTML attribute.
                                    // The `resourcePath` argument contains a path to the loaded HTML file.
                                    if (/\/staticfiles/.test(value)) {
                                        return false;
                                    }
                                    return true;
                                }
                            }
                        },
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                include: [srcPath],
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true
                        }
                    }
                ]
            },
            {
                test: /\.(s[ac])ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            importLoaders: 2,
                            sourceMap: DEV,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('tailwindcss'),
                                    require('autoprefixer'),
                                    require('postcss-csso')({ comments: false })
                                ]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: DEV,
                        },
                    }
                ]
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/i,
                include: [path.resolve(srcPath, 'assets')],
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                include: [path.resolve(srcPath, 'assets')],
                type: 'asset/inline'
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        pathinfo: false,
        path: distPath
    },
    plugins: [
        new ESLintPlugin({
            fix: true,
            emitWarning: false
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', './app/index.live.webpack.tmp.html')
        }),
        new CopyPlugin({
            patterns: [
                // copy static content here!!
                // Read the docs https://webpack.js.org/plugins/copy-webpack-plugin/
                { from: 'app/robots.txt', to: './' },
            ]
        })
    ],
    resolve: {
        cacheWithContext: false,
        symlinks: false,
        alias: {
            '@': path.resolve(srcPath), // eg css: `@/error/errors-style`
            Styles: path.resolve(srcPath, 'assets/styles') // eg css: `~Styles/helper`
            // _: path.resolve(__dirname, '..'), // Webpack 5
        },
        extensions: [
            '.tsx',
            '.ts',
            '.js',
            '.html',
            '.scss',
            '.svg',
            '.png',
            '.jpg',
            '.gif',
            '.eot',
            '.ttf',
            '.woff',
            '.woff2'
        ]
    }
});
