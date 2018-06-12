const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DIST = path.resolve('./build');

module.exports = {
    entry: {
        'admin.js': './src/app.ts',
        'admin.css': './src/styles/app.scss'
    },
    output: {
        filename: '[name]',
        path: DIST
    },
    module: {
        rules: [
            {test: /\.ts$/, loader: 'ts-loader'},
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader')
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            "actions": path.resolve(__dirname, "./src/actions"),
            "lib": path.resolve(__dirname, "./src/lib"),
            "components": path.resolve(__dirname, "./src/components"),
            "store": path.resolve(__dirname, "./src/store/index.ts"),
            "store/state": path.resolve(__dirname, "./src/store/state.ts"),
            "const": path.resolve(__dirname, "./src/const.ts")
        }
    },
    plugins: [
        new HTMLPlugin({
            template: './src/app.html'
        }),
        new CopyPlugin([
            {from: './src/images', to: 'images/'}
        ]),
        new ExtractTextPlugin('app.css')
    ]
}
