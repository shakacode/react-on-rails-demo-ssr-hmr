const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')

const webpackConfig = require('./ServerClientOrBoth')

const developmentEnvOnly = (clientWebpackConfig, _serverWebpackConfig) => {
  clientWebpackConfig.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, '../../tsconfig.json')
      },
      async: false
    })
  )
}
module.exports = webpackConfig(developmentEnvOnly)
