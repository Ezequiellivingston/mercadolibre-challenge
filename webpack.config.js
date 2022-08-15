const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')

const commonMdules = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
      type: 'asset/resource'
    },
    {
      test: /\.(s*)css$/,
      use: [
        { loader: MiniCssExtractPlugin.loader },
        'css-loader',
        'sass-loader'
      ]
    }
  ]
}

const commonPlugins = (filename) => [
  new ESLintPlugin({
    extensions: ['js', 'jsx', 'json'],
    fix: false,
    emitError: true,
    emitWarning: true,
    failOnError: true
  }),

  new StylelintPlugin({
    extensions: ['scss', 'css'],
    fix: false,
    emitError: true,
    emitWarning: true,
    failOnError: true
  }),

  new MiniCssExtractPlugin({
    filename: `${filename}.css`
  })
]

const commonResolve = {
  extensions: ['*', '.js', '.jsx'],
  alias: {
    '@': path.resolve(__dirname, 'src/')
  }
}

const configClient = (_, arg) => {
  const { mode } = arg

  const isProduction = mode === 'production'
  const filename = isProduction ? '[name].[contenthash]' : '[name]'

  return {
    entry: './src/client.js',

    devtool: 'source-map',

    module: commonMdules,

    plugins: [
      ...commonPlugins(filename),

      new HtmlWebpackPlugin({
        inject: 'body',
        template: './public/index.html',
        filename: path.resolve(__dirname, './build/public/index.html'),
        excludeChunks: ['server'],
        minify: isProduction
      })
    ],

    resolve: commonResolve,

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: `${filename}.js`
    },

    optimization: {
      minimize: isProduction
    }
  }
}

const configServer = (_, arg) => {
  const { mode } = arg

  const isProduction = mode === 'production'
  const filename = isProduction ? '[name].[contenthash]' : '[name]'

  return {
    entry: './src/server.js',

    devtool: 'source-map',

    target: 'node',

    node: {
      __dirname: false,
      __filename: false
    },

    module: commonMdules,

    plugins: commonPlugins(filename),

    resolve: commonResolve,

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'server.js'
    },

    optimization: {
      minimize: false
    }
  }
}

module.exports = [configClient, configServer]
