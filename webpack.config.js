const NodemonPlugin = require('nodemon-webpack-plugin') // Ding
const nodeExternals = require('webpack-node-externals')
module.exports = {
  stats: 'errors-only',
  mode: 'development',
  entry: './app.js',
  target: 'node',
  output: { filename: 'bundle.js' },
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  plugins: [
    new NodemonPlugin() // Dong
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
  devtool: 'source-map'
}
