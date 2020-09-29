const NodemonPlugin = require('nodemon-webpack-plugin') // Ding
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  stats: 'errors-only',
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
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true
                  }
                }
              ]
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-modules-commonjs'
              // '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      }
    ]
  }
}
