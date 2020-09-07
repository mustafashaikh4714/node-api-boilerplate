const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production'
})

// ========================== *USE THIS OPTION FOR SMALL OR MEDIUM SCALE APPLICATIONS.* ========================================//

// optimization: {
//   splitChunks: {
//     cacheGroups: {
//       defaultVendors: {
//         test: /[\\/]node_modules[\\/]/,
//         priority: -10
//       },
//       default: {
//         minChunks: 2,
//         priority: -20,
//         reuseExistingChunk: true
//       }
//     }
//   }
// }
