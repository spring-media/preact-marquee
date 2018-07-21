module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-cssnext': {
            browsers: ['last 2 versions', '> 5%'],
            warnForDuplicates: false,
            features: {
                customProperties: {
                    warnings: false
                }
            }
        },
        'cssnano': {}
    }
};
