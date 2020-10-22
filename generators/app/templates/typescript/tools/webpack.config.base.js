const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getEnv } = require('./env');

const isDevEnv = () => getEnv() === 'development';
const useCssPlugin = () => getEnv() !== 'development';

module.exports = {
  entry: {
    common: ['react', 'react-dom'],
    app: [path.resolve(__dirname, '../src/boot-loader.tsx')],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', './build'),
  },
  mode: isDevEnv() ? 'development' : 'production',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '#': path.resolve(__dirname, '..', './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [useCssPlugin() ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /(?<!module)\.less$/,
        use: [
          useCssPlugin() ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          { loader: 'less-loader', options: { javascriptEnabled: true } },
        ],
      },
      {
        test: /\.module\.less$/,
        exclude: /node_modules/,
        use: [
          useCssPlugin() ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'postcss-loader',
          { loader: 'less-loader', options: { javascriptEnabled: true } },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CleanWebpackPlugin(['build'], { root: path.resolve(__dirname, '..') }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './template.html',
      chunks: ['common', 'app'],
      inject: false,
      prefix: (() => {
        if (isDevEnv()) {
          return 'http://dev.taobao.com:8080/';
        }

        return '';

        // ["--def_publish_type=webapp","--def_publish_pages=[\"index.html\"]","--def_publish_env=daily"]
        // const buildArgs = process.env.BUILD_ARGV || '';
        // const envMatch = buildArgs.match(/def_publish_env=(\w+)/) || [];
        // const isDaily = envMatch[1] === 'daily';

        // const gitBranch = process.env.BUILD_GIT_BRANCH || '';
        // const versionMatch = gitBranch.match(/\d+(\.\d+){2}/g) || ['0.0.1'];

        // return `//${isDaily ? 'dev.' : ''}g.alicdn.com/bshop/h5-blockchain-2019/${versionMatch[0]}/`;
      })(),
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../html'),
    publicPath: '/',
    stats: { colors: true },
    historyApiFallback: {
      rewrites: [
        { from: /^\/?(\w+\/?)*$/g, to: '/index.html' },
      ]
    },
    disableHostCheck: true,
    hot: true,
    inline: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://abmate.alibaba.net/',
        secure: false,
        changeOrigin: true,
      },
    },
  },
};
