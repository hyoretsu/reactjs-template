/* eslint-disable import/no-extraneous-dependencies */
import { gzip } from '@gfx/zopfli';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

import appPackageJson from './package.json';

const config: webpack.Configuration = {
 cache: true,
 devtool: 'source-map',
 experiments: {
  asset: true,
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
    use: [MiniCssExtractPlugin.loader, 'css-loader'],
   },
   {
    test: /\.(jpe?g|png|gif)$/,
    type: 'asset',
   },
   {
    test: /\.svg$/,
    use: '@svgr/webpack',
   },
  ],
 },
 optimization: {
  splitChunks: {
   cacheGroups: {
    vendors: {
     test: /node_modules\/.pnpm\/(?!react-icons.*\/).*/,
     name: 'vendors',
     chunks: 'all',
    },
    ui: {
     test: /node_modules\/.pnpm\/(react-icons.*\/).*/,
     name: 'ui',
     chunks: 'all',
    },
   },
  },
  runtimeChunk: {
   name: 'runtime-main',
  },
 },
 output: {
  path: path.resolve(__dirname, 'build'),
  assetModuleFilename: 'static/media/[name].[hash:8][ext]',
  chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
  filename: 'static/js/[name].[contenthash:8].js',
  publicPath: appPackageJson.homepage,
 },
 plugins: [
  // @ts-ignore
  new CopyPlugin({
   patterns: [
    {
     from: 'public',
     globOptions: {
      ignore: ['**/index.html'],
     },
    },
   ],
  }),
  new HtmlWebpackPlugin({
   template: path.resolve(__dirname, 'public', 'index.html'),
  }),
  // @ts-ignore
  new MiniCssExtractPlugin({
   filename: 'static/css/[name].[contenthash:8].css',
   chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
  }),
  // @ts-ignore
  new WebpackManifestPlugin({
   fileName: 'asset-manifest.json',
   generate: (seed, files, entries) => {
    const manifestFiles = files.reduce((accumulator, file) => {
     // @ts-ignore
     accumulator[file.name] = file.path;

     return accumulator;
    }, seed);
    const entrypointFiles = entries.main.filter(filename => !filename.endsWith('.map'));

    return {
     files: manifestFiles,
     entrypoints: entrypointFiles,
    };
   },
  }),
  // @ts-ignore
  new CompressionPlugin({
   algorithm: gzip,
   deleteOriginalAssets: false,
   filename: '[path][base].gz',
   test: /\.(js|css|html|svg)$/i,
  }),
  // @ts-ignore
  new CompressionPlugin({
   algorithm: 'brotliCompress',
   compressionOptions: {
    level: 11,
   },
   deleteOriginalAssets: false,
   filename: '[path][base].br',
   test: /\.(js|css|html|svg)$/i,
  }),
 ],
 resolve: {
  extensions: ['.ts', '.tsx', '.js'],
  modules: [path.resolve(__dirname, 'src'), 'node_modules'],
 },
};

export default config;
