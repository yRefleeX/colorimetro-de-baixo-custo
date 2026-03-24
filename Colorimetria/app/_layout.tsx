import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack, router, useRootNavigationState, usePathname} from 'expo-router';
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
  const pathName = usePathname();

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

    const authRoutes = ['/', '/cadastrar', '/codigo', '/nova_senha'];
    const inAuthGroup = authRoutes.includes(pathName);

    if (pathName === '/nova_senha') {
        return;
    }

    if (
      // Se o utilizador não está autenticado e NÃO está numa tela de autenticação.
      !user &&
      !inAuthGroup
    ) {
      // Redireciona para a tela de login.
      router.replace('/');
    } else if (user && inAuthGroup) {
      // Se o utilizador está autenticado e está numa tela de autenticação (ex: login),
      // redireciona para a tela inicial.
      router.replace('/inicial');
    }
  }, [user, isLoading, loaded, navigationState?.key, pathName]);

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
      <Stack.Screen name="index" options={{headerShown: false, animation: 'fade'}}/>
      <Stack.Screen name="inicial" options={{headerShown: false, animation: 'fade'}}/>
      <Stack.Screen name="modelo_3d" options={{headerShown: false}}/>
      <Stack.Screen name="cadastrar" options={{headerShown: false}}/>
      <Stack.Screen name="codigo" options={{headerShown: false}}/>
      <Stack.Screen name="nova_senha" options={{headerShown: false}}/>
      <Stack.Screen name="cadastro_reacao" options={{headerShown: false}}/>
      <Stack.Screen name="dados_colorimetro" options={{headerShown: false}}/>
      <Stack.Screen name="possibilidade_reacao" options={{headerShown: false}}/>
    </Stack>
  );
}
