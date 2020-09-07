const NodemonPlugin = require('nodemon-webpack-plugin') // Ding
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  stats: 'errors-only',
  mode: 'production',
  entry: ['./app.js'],
  target: 'node',
  output: { path: path.join(__dirname, 'dist'), filename: 'bundle.js' },
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  plugins: [
    new CleanWebpackPlugin(),
    new NodemonPlugin(), // Dong
    new webpack.ProgressPlugin()
  ],
  module: {
    rules: [
      // configure webpack to work with eslint
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            configFile: `${__dirname}/.eslintrc`,
            emitErrors: true
          }
        }
      },
      // configure webpack to work with babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-modules-commonjs'
              // '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}
