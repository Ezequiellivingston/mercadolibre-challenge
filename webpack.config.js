const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const isProduction = process.env.NODE_ENV === 'production'
const filename = isProduction ? '[name].[contenthash]' : '[name]'

const configBase = {
  devtool: !isProduction ? 'source-map' : undefined,

  mode: process.env.NODE_ENV,

  plugins: [
    new MiniCssExtractPlugin({ filename: `${filename}.css` })
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        type: 'asset'
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
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },

  optimization: {
    minimize: isProduction
  }
}

const configClient = {
  ...configBase,

  entry: './src/client.js',

  plugins: [
    ...configBase.plugins,

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

    new HtmlWebpackPlugin({
      inject: 'body',
      template: './public/index.html',
      filename: path.resolve(__dirname, './build/public/index.html'),
      minify: isProduction
    })
  ],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: `${filename}.js`
  }
}

const configServer = {
  ...configBase,

  entry: './src/server.js',

  target: 'node',

  externals: [nodeExternals()],

  node: {
    __dirname: false,
    __filename: false
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js'
  }
}

module.exports = [configClient, configServer]
