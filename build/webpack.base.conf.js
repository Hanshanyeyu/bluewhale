var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var WebpackSftpClient = require('webpack-sftp-client');
var webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}


module.exports = {
  entry: {
    main: './src/main.js',
    vueVendor: ['vue', 'vue-router'],
    elementUi: ['element-ui', 'element-ui/lib/theme-default/index.css'],
    vueAwesome: 'vue-awesome',
    axios: ['axios'],
    babelPolyfill: ['babel-polyfill']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath :
      config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'vue-awesome': resolve('src/lib/vue-awesome.js')
    }
  },
  module: {
    rules: [{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
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
        include: [resolve('src'), resolve('test')],
        exclude: [resolve('node_modules')]
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
        include: [resolve('src'), resolve('test')]
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
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vueVendor', 'elementUi','axios','babelPolyfill']
    }),
    // new webpack.DllReferencePlugin({
    //   context: config.build.assetsRoot,
    //   manifest: require('../dll-manifest.json'),
    //   name: 'dll'
    // }),
  ]
}
