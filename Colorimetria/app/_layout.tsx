import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack, router, useRootNavigationState} from 'expo-router';
import 'react-native-reanimated';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigationState = useRootNavigationState();

  const firebaseConfig = {
    apiKey: "AIzaSyB6rWreNwmi2e7osBqj3kn1yP0J_bGExaI",
    authDomain: "colorimetro-de-baixo-custo.firebaseapp.com",
    projectId: "colorimetro-de-baixo-custo",
    storageBucket: "colorimetro-de-baixo-custo.firebasestorage.app",
    messagingSenderId: "52158465405",
    appId: "1:52158465405:web:19668e5dcdf73e31957814",
    measurementId: "G-H3PS3E0QZF"
  };

  useEffect(() => {
    const initFirebaseAndAuth = () => {
      try {
        // Acessa diretamente a configuração fornecida
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        // Listener de estado de autenticação
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          setUser(firebaseUser);
          setIsLoading(false);
        });

        return () => unsubscribe(); // Limpa o listener ao desmontar
      } catch (error) {
        console.error('Erro ao inicializar Firebase no _layout:', error);
        setIsLoading(false);
      }
    };

    initFirebaseAndAuth();
  }, []);

  useEffect(() => {
    // Garante que o estado de navegação esteja pronto antes de redirecionar
    if (!navigationState?.key || isLoading || !loaded) {
        return;
    }

    // A lógica de redirecionamento agora está aqui, fora do return
    if (user) {
        // Se o usuário estiver logado, navegue para a tela inicial
        router.navigate('/inicial');
    } else {
        // Se não estiver logado, navegue para a tela de login
        router.navigate('/');
    }
  }, [user, isLoading, loaded, navigationState?.key]);

  if (isLoading || !loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Verificando autenticação...</Text>
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="inicial" options={{ headerShown: false }} />
      <Stack.Screen name="modelo_3d" options={{ headerShown: false }} />
    </Stack>
  );
}
