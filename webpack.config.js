var config = {
  entry: {
    js: ['babel-polyfill', './app/index'],
    html: './app/index.html',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  devtools: 'sourcemaps',
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel?' + JSON.stringify({
            presets: ["react", "es2015", "stage-1"],
            // plugins: ['transform-runtime'],
          }),
         'ts',
       ],
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
    root: __dirname,
  },
};

if (process.env.NODE_ENV === 'production') {
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
