module.exports = {
  preset: 'jest-expo',

  setupFilesAfterEnv: ['./jest-setup.js'],

  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?firebase|@react-native|expo|react-native|@expo/vector-icons)'
  ],

  collectCoverage: true,
  collectCoverageFrom: [
    'tests/**/*.{js,jsx,ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.config.js',
  ],

  testMatch: [
    '**/tests/**/*.(spec|test).[jt]s?(x)'
  ],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};