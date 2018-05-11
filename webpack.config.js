const path = require('path');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/js/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.less'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [path.resolve(__dirname, 'node_modules')],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
      },
    ],
  },
  /**
   * @see https://github.com/webpack-contrib/webpack-serve
   */
  serve: {
    content: [__dirname, 'dist'],
    add: (app) => {
      const options = {
        target: 'http://localhost:8080',
        pathRewrite: p => `/fixtures${p}.json`,
        onProxyRes(proxyRes, req, res) {

          /**
           * duct tape :(
           */
          if (proxyRes.statusCode === 404) {
            const resWrite = res.write;
            const body = JSON.stringify({
              message: 'Not Found',
              documentation_url: 'https://developer.github.com/v3/',
            });

            res.write = () => {
              resWrite.call(res, body);
            };

            proxyRes.headers['content-length'] = body.length;
            proxyRes.headers['content-type'] = 'application/json; charset=utf-8';
          }
        },
      };

      app.use(convert(proxy('/users/', options)));
    },
  },
};
