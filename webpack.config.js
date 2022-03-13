const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve('src/app.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'app.js',
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: 'public/index.html',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public/style.css',
                    to: 'style.css'
                }
            ]
        })
    ]
}