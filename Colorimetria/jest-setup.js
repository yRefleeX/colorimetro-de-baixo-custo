// jest-setup.js
require('@testing-library/jest-native/extend-expect');
import 'dotenv/config';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);