import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react-native';
import HomeScreen from '../app/inicial';
import { router } from 'expo-router';
import { Alert } from 'react-native';

// Importação dos mocks
jest.mock('expo-router', () => ({
  router: { navigate: jest.fn() },
}));
jest.mock('@/components/UserInfoDisplay', () => () => null);
jest.mock('@expo/vector-icons', () => ({
  MaterialCommunityIcons: () => null,
}));
jest.spyOn(Alert, 'alert');

// Mock do Firebase Auth
let authStateCallback: (user: any) => void;
jest.mock('../firebaseConfig', () => ({
  auth: {
    onAuthStateChanged: jest.fn((callback) => {
      authStateCallback = callback;
      return () => {};
    }),
  },
}));
jest.mock('firebase/auth', () => ({
  signOut: jest.fn(() => Promise.resolve(true)),
  getAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn((auth, callback) => {
     authStateCallback = callback;
     return () => {};
  }),
}));

describe('HomeScreen', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Cenário 1: Usuário Logado
  it('deve permitir a navegação para uma rota protegida (usuário logado)', async () => {
    render(<HomeScreen />);
    
    await act(async () => {
      const mockUser = { uid: '12345', isAnonymous: false, displayName: 'Andre Teste' };
      authStateCallback(mockUser);
    });

    const protectedButton = screen.getByText(/cadastrar reação colorímetro/i);
    fireEvent.press(protectedButton);

    expect(router.navigate).toHaveBeenCalledWith('/cadastro_reacao');
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  // Cenário 2: Usuário Convidado (Anônimo)
  it('NÃO deve permitir a navegação para uma rota protegida e deve mostrar um alerta (convidado)', async () => {
    render(<HomeScreen />);
    
    await act(async () => {
      const mockGuest = { uid: '67890', isAnonymous: true };
      authStateCallback(mockGuest);
    });

    const protectedButton = screen.getByText(/cadastrar reação colorímetro/i);
    fireEvent.press(protectedButton);

    expect(router.navigate).not.toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith(
      "Função Limitada",
      "Para acessar esta funcionalidade, por favor, crie uma conta."
    );
  });

  // Cenário 3: Rota Pública
  it('deve permitir a navegação para uma rota pública (convidado)', async () => {
    render(<HomeScreen />);
    
    await act(async () => {
      const mockGuest = { uid: '67890', isAnonymous: true };
      authStateCallback(mockGuest);
    });

    const publicButton = screen.getByText(/visualize o modelo 3d do colorímetro/i);
    fireEvent.press(publicButton);

    expect(router.navigate).toHaveBeenCalledWith('/modelo_3d');
    expect(Alert.alert).not.toHaveBeenCalled();
  });
});