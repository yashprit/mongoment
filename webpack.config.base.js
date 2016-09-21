import path from 'path';

export default {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    },{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: require.resolve('file-loader') },
      { test: /\.(woff|woff2)$/, loader:require.resolve('url-loader')+"?prefix=font/&limit=500000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: require.resolve('url-loader')+"?limit=500000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: require.resolve('url-loader')+"?limit=500000&mimetype=image/svg+xml" }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
  },
  plugins: [

  ],
  externals: [ 'mongodb'
    // put your node 3rd party libraries which can't be built with webpack here
    // (mysql, mongodb, and so on..)
  ]
};
