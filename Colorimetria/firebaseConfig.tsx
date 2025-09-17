// Importando as bibliotecas necessárias
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth, getAuth, type Auth } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Sua configuração do Firebase que estava no LoginScreen
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Inicializa o Firebase APENAS UMA VEZ
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inicializa o auth com persistência apenas uma vez
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, app };