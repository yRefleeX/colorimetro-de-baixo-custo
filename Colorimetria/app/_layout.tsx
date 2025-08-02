import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack, router, useRootNavigationState} from 'expo-router';
import 'react-native-reanimated';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigationState = useRootNavigationState();

  useEffect(() => {
        // Listener de estado de autenticação
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          setUser(firebaseUser);
          setIsLoading(false);
        });

        return () => unsubscribe(); // Limpa o listener ao desmontar
  }, []);

  useEffect(() => {
    // Garante que o estado de navegação esteja pronto antes de redirecionar
    if (!navigationState?.key || isLoading || !loaded) {
        return;
    }

    // A lógica de redirecionamento agora está aqui, fora do return
    if (user) {
        // Se o usuário estiver logado, navegue para a tela inicial
        router.replace('/inicial');
    } else {
        // Se não estiver logado, navegue para a tela de login
        router.replace('/');
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
      <Stack.Screen name="cadastrar" options={{ headerShown: false }} />
      <Stack.Screen name="codigo" options={{ headerShown: false }} />
      <Stack.Screen name="nova_senha" options={{ headerShown: false }} />
    </Stack>
  );
}
