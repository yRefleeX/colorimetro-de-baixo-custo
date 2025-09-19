module.exports = {
  preset: 'jest-expo',

  setupFilesAfterEnv: [
    './jest-setup.js'
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?@?firebase|@react-native|expo|react-native|@expo/vector-icons)"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.config.js',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};