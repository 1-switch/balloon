module.exports = {
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true
    },
    entry: {
        balloon: './src/balloon/main.js',
    },
    output: {
        filename: '[name]/main.js',
        path: __dirname + '/docs'
    }
}
