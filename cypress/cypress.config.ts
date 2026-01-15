import { defineConfig } from 'cypress';
import { webpackConfig } from './webpack.config';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
      webpackConfig,
    },
    specPattern: '**/*.cy.ts',
    supportFolder: 'cypress/support',
    fixturesFolder: './fixtures',
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
});
