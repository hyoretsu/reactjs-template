/* eslint-disable import/no-extraneous-dependencies */
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import { CustomizeRule } from 'webpack-merge';
import { mergeWithRules } from 'webpack-merge';

import appPackageJson from './package.json';
import TSConfig from './tsconfig.json';

const getAliases = (): Record<string, string[]> => {
 const aliasesObject = {};

 Object.entries(TSConfig.compilerOptions.paths).forEach(entry => {
  const alias = entry[0].split('/*')[0];
  const aliased = entry[1][0].split('/*')[0];

  Object.assign(aliasesObject, {
   [alias]: path.resolve(__dirname, 'src', aliased),
  });
 });

 return aliasesObject;
};

export default function webpackConfig(
 mode: 'production' | 'development',
 specialConfigs: webpack.Configuration,
): webpack.Configuration {
 const config = {
  mode,
  cache: {
   type: 'filesystem',
   version: appPackageJson.version.split('.')[0],
  },
  module: {
   rules: [
    {
     test: /\.(js|ts)x?$/,
     exclude: /node_modules/,
     use: {
      loader: 'babel-loader',
      options: {
       cacheCompression: false,
       cacheDirectory: true,
      },
     },
    },
    {
     test: /\.css$/,
     use: [
      mode === 'production'
       ? {
          loader: MiniCssExtractPlugin.loader,
          options: { publicPath: appPackageJson.homepage },
         }
       : 'style-loader',
      {
       loader: 'css-loader',
       options: { importLoaders: 1 },
      },
     ],
     sideEffects: true,
    },
    {
     test: /\.(jpe?g|png|gif)$/,
     type: 'asset/resource',
    },
    {
     test: /\.svg$/,
     use: '@svgr/webpack',
    },
   ],
   strictExportPresence: true,
  },
  output: {
   path: path.resolve(__dirname, 'build'),
  },
  // @ts-ignore
  plugins: [
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
   mode === 'production' &&
    new MiniCssExtractPlugin({
     filename: 'static/css/[name].[contenthash:8].css',
     chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
  ].filter(Boolean),
  resolve: {
   alias: getAliases(),
   extensions: ['.tsx', '.ts', '.json', '.js', '.jsx'],
   modules: ['node_modules', path.resolve(__dirname, 'src')],
  },
 };

 const mergingRules = {
  module: {
   rules: {
    test: CustomizeRule.Match,
    use: {
     loader: CustomizeRule.Match,
     options: CustomizeRule.Replace,
    },
   },
  },
 };

 return mergeWithRules(mergingRules)(config, specialConfigs);
}
