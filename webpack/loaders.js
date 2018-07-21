exports.tslint = {
    enforce: 'pre',
    test: /\.tsx?$/,
    loader: 'tslint-loader',
    options: {
        typeCheck: true
    },
    exclude: /node_modules/
};

exports.tsx = {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /(node_modules|test-utils|\.test\.ts$)/
};

exports.scss = {
    test: /\.scss/,
    use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader'
    ],
    exclude: /node_modules/
};

exports.html = {
    test: /\.html$/,
    loader: 'raw-loader',
    exclude: /node_modules/
};
