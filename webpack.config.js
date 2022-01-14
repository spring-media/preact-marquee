const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const loaders = require('./webpack/loaders');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const IS_PROD = process.env.NODE_ENV === 'production';

const basePlugins = [
    new StyleLintPlugin({
        configFile: './.stylelintrc',
        files: 'src/**/*.scss',
        syntax: 'scss'
    })
];

const devPlugins = [
    new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: 'body',
        chunks: [
            'examples'
        ]
    }),
];

const prodPlugins = [
    new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false
    })
];

const plugins = basePlugins
    .concat(IS_PROD ? prodPlugins : devPlugins);

const outputPath = path.join(__dirname, 'dist');

module.exports = {

    mode: process.env.NODE_ENV,

    entry: {
        ...(!IS_PROD ? { examples: './src/examples.tsx' } : {}),
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
        minimizer: IS_PROD ? [new UglifyJsPlugin()] : [],
        noEmitOnErrors: true
    },

    performance: {
        maxEntrypointSize: 400000,
        maxAssetSize: 400000
    },

    externals: [IS_PROD ? 'preact' : ''],

    module: {
        rules: [
            loaders.tslint,
            {
                ...loaders.tsx,
                ...(IS_PROD ? {
                    options: {
                        configFile: '../tsconfig.build.json'
                    }
                } : {})
            },
            loaders.html,
            loaders.scss
        ]
    }
};
