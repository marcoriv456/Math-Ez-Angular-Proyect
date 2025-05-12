import path from 'path';
import {AngularWebpackPlugin} from '@ngtools/webpack';

export const webpackConfig = {
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack',
      },
    ],
  },
  plugins: [
    new AngularWebpackPlugin({
      tsconfig: path.resolve(__dirname, './tsconfig.json')
    }),
  ],
};
