const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'docs'),
    },
    devServer: {
        contentBase: './docs'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Roll 2 Roll',
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/offline/offline.html',
            chunks: [],
            filename: './offline/index.html' 
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/404/not-found.html',
            chunks: [],
            filename: './not-found/index.html' 
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/share/share.html',
            chunks: [],
            filename: './share-target/index.html' 
        }),
        new CopyPlugin([
            {
              from: 'assets/**',
              to: './'
            },
            {
                from: 'src/sw.js',
                to: './'
            },
            {
                from: 'src/manifest.json',
                to: './'
            }
          ]),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        // ISSUE: https://github.com/material-components/material-components-web/issues/5502
                        loader: 'sass-loader',
                        options: {
                            // ISSUE: https://github.com/webpack-contrib/sass-loader/issues/804#issuecomment-586095020
                            webpackImporter: false,
                            implementation: require('dart-sass'),
                            sassOptions: {
                                includePaths: ['node_modules'],
                                fiber: require('fibers'),
                            },
                        }
                    },
                ],
            },
        ],

    }
};