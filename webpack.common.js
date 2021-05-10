const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
        rules: [
            { test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/, options: { sourceMap: true } },
            {
                test: /\.(scss|css)$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath: './',
                    }
                  }, { loader: 'css-loader', options: {sourceMap: true}}, { loader: 'sass-loader', options: { sourceMap: true}}],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './'
                        }
                    }
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
    performance: {
        assetFilter: function(assetFilename) {
            return !assetFilename.includes('.ttf');
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new CompressionWebpackPlugin({
            algorithm: "gzip",
        }),
        new CopyPlugin({
            patterns: [{ from: 'src/public', to: '' }],
        }),
    ],
};
