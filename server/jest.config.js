/* eslint-env node */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: [
    // Allow transformation of ESM modules in pnpm's .pnpm directory
    'node_modules/(?!.pnpm|@navikt)',
  ],
  moduleNameMapper: {
    // Mock parse5 which is ESM-only
    '^parse5$': '<rootDir>/__mocks__/parse5.js',
  },
};
