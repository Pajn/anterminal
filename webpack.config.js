const production = process.env.NODE_ENV === 'production';

var config = {
  entry: {
    js: ['babel-polyfill', './app/index'],
    html: './app/index.html',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel?' + JSON.stringify({
            presets: ["react", "es2015", "stage-1"],
            plugins: ['jsx-tagclass'],
          }),
         'ts',
       ],
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.scss$/,
        exclude: /\.global\.scss$/,
        loaders: [
          'style',
          'css?modules',
          'resolve-url',
          'sass',
        ],
      },
      {
        test: /\.global\.scss$/,
        loaders: [
          'style',
          'css',
          'resolve-url',
          'sass',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
    root: __dirname,
  },
};

if (production) {
  var webpack = require('webpack');

  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      test: /\.js$/,
      // mangle: false,
    }),
  ];
}

module.exports = config;
