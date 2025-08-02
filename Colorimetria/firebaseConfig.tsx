// Importando as bibliotecas necessárias
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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
const app = initializeApp(firebaseConfig);

// Obtém a instância de autenticação e a exporta para ser usada em qualquer lugar do app
export const auth = getAuth(app);