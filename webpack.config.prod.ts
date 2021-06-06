/* eslint-disable import/no-extraneous-dependencies */
import { gzip } from '@gfx/zopfli';
import CompressionPlugin from 'compression-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

import appPackageJson from './package.json';
import webpackConfig from './webpack.config';

interface IDevtoolTemplateInfo {
 absoluteResourcePath: string;
 allLoaders: string;
 hash: string;
 id: string;
 loaders: string;
 resource: string;
 resourcePath: string;
 namespace: string;
}

const hashedName = '[name].[contenthash:8]';
const HTMLMinifyOptions = {
 collapseBooleanAttributes: true,
 collapseInlineTagWhitespace: true,
 collapseWhitespace: true,
 decodeEntities: true,
 keepClosingSlash: true,
 minifyCSS: true,
 minifyJS: true,
 minifyURLs: true,
 processConditionalComments: true,
 removeAttributeQuotes: true,
 removeComments: true,
 removeEmptyAttributes: true,
 removeRedundantAttributes: true,
 removeScriptTypeAttributes: true,
 removeStyleLinkTypeAttributes: true,
 trimCustomFragments: true,
 useShortDoctype: true,
};

const config: webpack.Configuration = {
 bail: true,
 devtool: 'source-map',
 output: {
  assetModuleFilename: `static/media/${hashedName}[ext]`,
  chunkFilename: `static/js/${hashedName}.chunk.js`,
  filename: `static/js/${hashedName}.js`,
  clean: true,
  publicPath: appPackageJson.homepage,
  devtoolModuleFilenameTemplate: (info: IDevtoolTemplateInfo) => `${info.absoluteResourcePath.split('src/')[1]}`,
 },
 optimization: {
  splitChunks: {
   cacheGroups: {
    ui: {
     test: /node_modules\/.pnpm\/(react-icons.*\/).*/,
     name: 'ui',
     chunks: 'all',
    },
    vendors: {
     test: /node_modules\/.pnpm\/(?!react-icons.*\/).*/,
     name: 'vendors',
     chunks: 'all',
    },
   },
  },
  runtimeChunk: {
   name: 'runtime-main',
  },
  mangleWasmImports: true,
  sideEffects: false,
  // @ts-ignore
  minimizer: [
   new TerserPlugin({
    terserOptions: {
     compress: {
      passes: 2,
      unsafe: true,
      unsafe_Function: true,
      unsafe_math: true,
      unsafe_proto: true,
     },
     ecma: 5,
     format: {
      ascii_only: true,
      comments: false,
     },
     toplevel: true,
    },
   }),
   new CssMinimizerPlugin(),
  ].filter(Boolean),
 },
 // @ts-ignore
 plugins: [
  new HtmlWebpackPlugin({
   inject: true,
   template: path.resolve(__dirname, 'public', 'index.html'),
   minify: HTMLMinifyOptions,
  }),
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
  new CompressionPlugin({
   algorithm: gzip,
   filename: `[path][base].gz`,
   test: /\.(js|css|html|svg)$/,
  }),
  new CompressionPlugin({
   algorithm: 'brotliCompress',
   compressionOptions: {
    level: 11,
   },
   filename: '[path][base].br',
   test: /\.(js|css|html|svg)$/,
  }),
 ].filter(Boolean),
};

export default webpackConfig('production', config);
