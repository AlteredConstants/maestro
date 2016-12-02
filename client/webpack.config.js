const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootPath = __dirname;
const PATH = {
  static: path.join(rootPath, 'static'),
  source: path.join(rootPath, 'src'),
  test: path.join(rootPath, 'test'),
  serve: path.join(rootPath, 'build'),
  public: '/',
  entry: ['app'],
  outputName: 'app.js',
};
Object.assign(PATH, {
  build: PATH.serve,
  app: PATH.source,
});

const base = {
  entry: [
    'babel-polyfill',
    'isomorphic-fetch',
  ],
  output: {
    path: PATH.build,
    publicPath: PATH.public,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      PATH.app,
      'node_modules',
    ],
  },
  module: {
    rules: [
      // Too noisy right now.
      // { test: /\.jsx?$/, loader: 'eslint-loader', include: [PATH.source, PATH.test], enforce: 'pre' },
      { test: /\.jsx?$/, loader: 'babel-loader', include: [PATH.source, PATH.test] },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{ from: PATH.static }]),
  ],
};

const app = merge(base, {
  entry: PATH.entry,
  output: {
    filename: PATH.outputName,
  },
});

const debug = {
  output: { pathinfo: true },
  devtool: 'sourcemap',
  devServer: {
    port: 8080,
    contentBase: PATH.serve,
    historyApiFallback: true,
    proxy: {
      '/api': { target: 'http://localhost:3000' },
    },
  },
};

const configs = {
  development: merge(app, debug),
  production: merge(app, {
    plugins: [new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })],
  }),
};

module.exports = ({ config } = {}) => {
  const environment = (config in configs) ? config : 'development';
  return merge(configs[environment], {
    plugins: [
      new webpack.DefinePlugin({
        // Provide the environment to modules.
        // (Specifically for optimizing React in prod builds.)
        'process.env': { NODE_ENV: JSON.stringify(environment) },
      }),
    ],
  });
};
