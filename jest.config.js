module.exports = {
  preset: 'jest-preset-angular',
  transform: {
    '^.+\\.(ts|mjs|html)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.spec.ts', '**/*.spec.ts'],
  transformIgnorePatterns: ['node_modules/(?!@angular|rxjs)'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@environments/(.*)$': '<rootDir>/src/environments/$1',
  },
};
