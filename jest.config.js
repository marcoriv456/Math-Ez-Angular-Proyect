module.exports = {
  preset: 'jest-preset-angular',
  testMatch: ['**/__tests__/**/*.spec.ts', '**/*.spec.ts'],
  transformIgnorePatterns: ['node_modules/(?!@angular|rxjs)'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
    },
  },
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@environments/(.*)$': '<rootDir>/src/environments/$1',
  },
};
