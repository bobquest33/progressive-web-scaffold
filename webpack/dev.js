/* eslint-disable import/no-commonjs */

const webpack = require('webpack')
const ip = require('ip')

const loaderConfig = require('./base.loader')
const mainConfig = require('./base.main')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

mainConfig.entry = mainConfig.entry.concat([
    `webpack-dev-server/client?https://${ip.address()}:8443/`,
    'webpack/hot/only-dev-server'
])

mainConfig.module.loaders = mainConfig.module.loaders.concat({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(['css?-autoprefixer&-url', 'postcss', 'sass']),
    include: [
        /node_modules\/progressive-web-sdk/,
        /app/
    ]
})

mainConfig.output.publicPath = `https://${ip.address()}:8443/`

mainConfig.plugins = mainConfig.plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
])

module.exports = [mainConfig, loaderConfig]
