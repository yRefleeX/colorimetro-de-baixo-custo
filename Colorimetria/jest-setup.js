// jest-setup.js
require('@testing-library/react-native/extend-expect');

// Mockar react-native-async-storage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mockar firebase/auth
jest.mock('firebase/auth', () => ({
  getReactNativePersistence: jest.fn(),
  initializeAuth: jest.fn(),
  GoogleAuthProvider: {
    credential: jest.fn(() => ({ /* mock de credencial */ })),
  },
  signInWithCredential: jest.fn(() => Promise.resolve({ /* mock de usuário */ })),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ /* mock de usuário */ })),
  signInAnonymously: jest.fn(() => Promise.resolve({ /* mock de usuário */ })),
}));

// Mockar @react-native-google-signin
jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(() => Promise.resolve(true)),
    signIn: jest.fn(() => Promise.resolve({ 
      data: { idToken: 'mocked-id-token' } 
    })),
  },
}));

// Mockar expo-router
jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
  },
}));

// Mockar react-hook-form (apenas para silenciar warnings de 'act')
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  Controller: () => <></>,
  useForm: () => ({
    control: () => ({}),
    handleSubmit: (fn) => fn, // Retorna a própria função para execução
    formState: { errors: {} },
  }),
}));