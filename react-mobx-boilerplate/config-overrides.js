const {
  addWebpackPlugin,
  addBabelPlugins,
  override,
  addDecoratorsLegacy,
  disableEsLint,
  fixBabelImports
} = require("customize-cra")
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const mode = process.env.NODE_ENV === "development" ? "dev" : "prod"
const lessLoader = () => (config) => {
  const lessLoader = [{
    loader: mode === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader,
  }, {
    loader: 'css-loader', options: { ...cssLoaderOptions, importLoaders: 1 }
  }, {
    loader: 'less-loader',
    options: {
      javascriptEnabled: true,
      modifyVars: {
        'hack': `true; @import "${path.resolve(__dirname, './src/constants/variable.less')}";`
      }
    }
  }]
  const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf

  loaders.splice(loaders.length - 1, 0, {
    test: /\.less$/,
    use: lessLoader,
    sideEffects: mode === "prod"
  })
  return config
}

const htmlLoader = () => (config) => {
  const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf
  loaders.splice(loaders.length - 1, 0, { test: /\.html$/, loader: 'html-loader' })
  return config
}

module.exports = override(
  fixBabelImports("import", {
    libraryName: 'antd',
    libraryDirectory: "es",
    style: true
  }),
  addDecoratorsLegacy(),
  disableEsLint(),
  ...addBabelPlugins(
    ["babel-plugin-module-resolver", {
      "root": ["./src"],
      "alias": {
        "components": "./src/components",
        "pages": "./src/pages",
        "assets": "./src/assets",
        "constants": "./src/constants",
        "forms": "./src/forms",
        "utils": "./src/utils",
      }
    }],
    "babel-plugin-styled-components"
  ),
  addWebpackPlugin(
    new MiniCssExtractPlugin({
      filename: mode === 'dev' ? '[name].css' : '[name].[hash].css',
      chunkFilename: mode === 'dev' ? '[id].css' : '[id].[hash].css',
    })
  ),
  lessLoader(),
  htmlLoader()
)

const cssLoaderOptions = {
  modules: true,
  getLocalIdent: (context, localIdentName, localName) => {
    if (context.resourcePath.includes('node_modules')) {
      return localName
    }
    const match = context.resourcePath.match(/src(.*)/)
    if (match && match[1]) {
      const antdProPath = match[1].replace('.less', '')
      const arr = antdProPath
        .split('/')
        .map(a => a.toLowerCase())
      arr.pop()
      return `zip-${arr.join('-')}-${localName}`.replace(/-components/g, '').replace(/--/g, '-')
    }
    return localName
  }
}
