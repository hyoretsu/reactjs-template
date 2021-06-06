/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack.config';

interface IWebpackConfig extends webpack.Configuration {
 devServer: WebpackDevServer.Configuration;
}

const config: IWebpackConfig = {
 performance: false,
 devServer: {
  hot: true,
  https: {
   cert: fs.readFileSync(path.resolve(__dirname, '..', 'private.crt')),
   key: fs.readFileSync(path.resolve(__dirname, '..', 'private.key')),
  },
  open: true,
  port: 3000,
 },
 plugins: [
  new HtmlWebpackPlugin({
   inject: true,
   template: path.resolve(__dirname, 'public', 'index.html'),
  }),
  new webpack.HotModuleReplacementPlugin(),
 ].filter(Boolean),
};

export default webpackConfig('development', config);
