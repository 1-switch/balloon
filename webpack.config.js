module.exports = {
    entry: {
        balloon: './src/balloon/main.js',
    },
    output: {
        filename: '[name]/main.js',
        path: __dirname + '/docs'
    }
}
