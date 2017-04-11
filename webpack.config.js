var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var APP_DIR = path.join(__dirname, 'src');
var BUILD_DIR = path.join(__dirname, 'dist');

var target = (process.env.NODE_ENV || 'local');

var environments = {
  local: {
    namingScheme: '',
    devServer: true,
    baseUrl: 'http://localhost:8081',
  },
  production: {
    namingScheme: '-[hash:6]',
    uglify: true,
    publicPath: '/',
    baseUrl: '/',
  },
};

var config = environments[target];

console.log('APP_DIR:', APP_DIR);

var webpackConfig = {
  entry: ['babel-polyfill', path.join(APP_DIR + '/scripts/', 'index.js')],
  output: {
    path: BUILD_DIR,
    filename: 'bundle' + config.namingScheme + '.js',
    publicPath: config.publicPath || '/',
  },
  resolve: {
    root: APP_DIR,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: config.uglify ? '"production"' : '"development"',
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(APP_DIR, 'index.html'),
      inject: 'body',
      baseUrl: config.baseUrl,
    }),
  ],
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include: [APP_DIR],
        exclude: /node_modules/,
        loaders: ['babel', 'eslint-loader'],
        alias: {
          TweenMax: 'gsap/src/uncompressed/TweenMax.js',
          TweenLite: 'gsap/src/uncompressed/TweenLite.js',
          TimelineLite: 'gsap/src/uncompressed/TimelineLite.js',
          TimelineMax: 'gsap/src/uncompressed/TimelineMax.js',
          EasePack: 'gsap/src/uncompressed/easing/EasePack.js',
          CSSPlugin: 'gsap/src/uncompressed/plugins/CSSPlugin.js',
        },
      },
      {
        loader: 'file',
        test: /\.(gif|png|jpg|woff|woff2|eot|svg|ttf)$/,
        query: {
          name: '[name]' + config.namingScheme + '.[ext]',
        },
        include: [APP_DIR],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: APP_DIR,
    historyApiFallback: true,
    port: 8081,
    hot: true,
    inline: true,
    colors: true,
    reasons: true,
    stats: 'errors-only',
    host: '0.0.0.0',
    open: true,
    debug: true,
    cache: true,
  }
};

var sassPreferences = 'css!autoprefixer?browsers=' + encodeURI("> 0%") + '!sass?indentedSyntax=true?outputStyle=expanded';
var sassLoader = {
  test: /\.sass$/,
  loader: 'style!' + sassPreferences,
  include: [APP_DIR],
};

if (config.devServer) {
  webpackConfig.devtool = 'source-map';
  webpackConfig.entry.unshift('webpack/hot/dev-server');
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  delete webpackConfig.devServer;
  webpackConfig.debug = false;
  webpackConfig.cache = false;
  webpackConfig.plugins.push(new ExtractTextPlugin('styles' + config.namingScheme + '.css'));
  sassLoader.loader = ExtractTextPlugin.extract('style', sassPreferences);
}

webpackConfig.module.loaders.push(sassLoader);

if (config.uglify) {
  webpackConfig.plugins.push(new webpack.optimize.DedupePlugin());
  webpackConfig.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: true,
    sourceMap: false,
    compress: {
      warnings: false,
    },
  }));
}

module.exports = webpackConfig;
