const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('@babel/register', {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
});
console.log('.ts files are registered for babel.');

let config = {
    devtool: "source-map",
    entry: ['./src/App.ts', './src/scss/main.scss'],
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './web'),
        publicPath: '/',
        filename: 'main.[hash].js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.vue']
    },
    devServer: {
        // noInfo: true,
        port: 8000,
        contentBase: path.join(__dirname, './web'),
        compress: true,
        historyApiFallback: {                                           // Autoriser de délivrer du contenu SPA sur des URL (permet d'éviter des 404
            rewrites: [
                { from: /.*\.[\d\w]+$/, to: '/index.html' },
            ]
        }
    },
    module: {
        rules: [
            // JS Files
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: [/node_modules/]
            },
            // TS Files
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                ],
                exclude: [/node_modules/]
            },
            // Vue Files
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: [/node_modules/]
            },
            // SCSS Files
            {
                test: /\.(scss|css)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            context: path.resolve(__dirname, "src/"),
                            outputPath: 'Images/',
                            publicPath: './Images',
                            useRelativePaths: true
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                include: [
                    path.resolve('src'),
                    path.resolve('node_modules/iview/'),
                ],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "app.[contenthash].css",
        }),
        new HtmlWebpackPlugin({
            template: "src/index_template.html",
            filename: "index.html"
        })
    ]
};

module.exports = config;