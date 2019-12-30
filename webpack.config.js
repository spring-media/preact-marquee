const path                 = require('path');
const webpack              = require('webpack');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const loaders              = require('./webpack/loaders');
const UglifyJsPlugin       = require('uglifyjs-webpack-plugin');
const StyleLintPlugin      = require('stylelint-webpack-plugin');

const basePlugins = [
    new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: 'body',
        chunks: [
            'examples'
        ]
    }),

    new StyleLintPlugin({
        configFile: './.stylelintrc',
        files: 'src/**/*.scss',
        syntax: 'scss'
    })
];

const prodPlugins = [
    new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false
    })
];

const plugins = basePlugins
    .concat(process.env.NODE_ENV === 'production' ? prodPlugins : []);

const outputPath = path.join(__dirname, 'dist');

module.exports = {

    mode: process.env.NODE_ENV,

    entry: {
        examples: './src/examples.tsx',
        Marquee: './src/Marquee.tsx'
    },

    output: {
        path: outputPath,
        filename: '[name].js',
        publicPath: '/',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].js',
        libraryTarget: "umd",
        umdNamedDefine: true
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.tsx', '.ts', '.js'],
        modules: [
            'node_modules',
            'src'
        ]
    },

    plugins: plugins,

    optimization: {
        minimizer: process.env.NODE_ENV === 'production' ? [
            new UglifyJsPlugin()
        ] : [],
        noEmitOnErrors: true
    },

    performance: {
        maxEntrypointSize: 400000,
        maxAssetSize: 400000
    },

    module: {
        rules: [
            loaders.tslint,
            loaders.tsx,
            loaders.html,
            loaders.scss
        ]
    }
};
