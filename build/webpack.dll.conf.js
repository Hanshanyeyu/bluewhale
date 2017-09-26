const path = require('path');
const webpack = require('webpack');
const config = require('../config');
var vueLoaderConfig = require('./vue-loader.conf')
var utils = require('./utils')
module.exports = {
  entry: {
    // dll: ['vue', 'vue-router','element-ui', 'element-ui/lib/theme-default/index.css','vue-awesome','axios','babel-polyfill']
    vueVendor: ['vue', 'vue-router',],
    elementUi: ['element-ui', 'element-ui/lib/theme-default/index.css'],
    vueAwesome: ['vue-awesome'],
    axios: ['axios'],
    babelPolyfill: ['babel-polyfill']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    library: '[name]_[hash]'
  },
  module: {
    rules: [{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      path: "[name]-manifest.json",
      name: "[name]_[hash]"
    })
  ]
}