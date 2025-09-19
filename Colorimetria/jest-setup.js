// jest-setup.js
require('@testing-library/jest-native/extend-expect');
require('dotenv/config');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);