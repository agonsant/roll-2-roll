const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Roll 2 Roll',
            template: './src/index.html'
        }),
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