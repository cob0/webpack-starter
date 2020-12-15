const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

module.exports = {
    mode: 'production', // production
    optimization: {
        minimizer: [ new OptimizeCssAssetsWebpackPlugin() ]
    },
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        // sirve para decir que hacer con algunos
        // tipos de archivos, por ejemplo: cuando haga 
        // el build.
        rules: [
            // que aplique la regla si es un fichero .html.
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                    presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                exclude: /style\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /style\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false // to minify
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            // origen
            template: './src/index.html',
            // destino
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            //filename: '[name].[contenthash].css',
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: 'assets/'
                }
            ]
        }),
        new MinifyPlugin({})
    ]
}