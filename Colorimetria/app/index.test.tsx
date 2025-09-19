import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react-native';
import LoginScreen from './index';

// Mock do Google Signin
jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(() => Promise.resolve(true)),
    signIn: jest.fn(() => Promise.resolve({
      data: { idToken: 'mock-id-token' }
    })),
  },
}));

// Mock das funções do Firebase Auth
jest.mock('firebase/auth', () => ({
  signInWithCredential: jest.fn(() => Promise.resolve(true)),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
  signInAnonymously: jest.fn(() => Promise.resolve(true)),
  GoogleAuthProvider: {
    credential: jest.fn((token) => ({ token })),
  },
}));

// Mock do expo-router (mock simples da navegação)
jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
  },
}));

// Mock do ícone para evitar erro
jest.mock('@expo/vector-icons', () => ({
  MaterialCommunityIcons: () => null,
}));

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { signInWithCredential, signInWithEmailAndPassword, signInAnonymously, GoogleAuthProvider } from 'firebase/auth';
import { router } from 'expo-router';

describe('LoginScreen', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza o estado inicial corretamente', () => {
    render(<LoginScreen />);
    expect(screen.getByText(/chromalab/i)).toBeTruthy();
    expect(screen.getByText(/entrar com email/i)).toBeTruthy();
    expect(screen.getByText(/entrar com o google/i)).toBeTruthy();
    expect(screen.getByText(/entrar como convidado/i)).toBeTruthy();
  });

  test('exibe formulário de email ao pressionar "Entrar com Email"', async () => {
    render(<LoginScreen />);
    
    // Pressiona o botão para mostrar o formulário
    await act(async () => {
      fireEvent.press(screen.getByText(/entrar com email/i));
    });

    // DEBUG: imprime tudo que está renderizado para ver se aparece o form
    screen.debug();

    // Tenta pegar o input de email
    const emailInput = await screen.findByPlaceholderText(/email/i);
    expect(emailInput).toBeTruthy();
  });

  it('faz login com Google quando o botão é pressionado', async () => {
    render(<LoginScreen />);

    await act(async () => {
      fireEvent.press(screen.getByText(/entrar com o google/i));
    });

    expect(GoogleSignin.hasPlayServices).toHaveBeenCalledTimes(1);
    expect(GoogleSignin.signIn).toHaveBeenCalledTimes(1);
    expect(GoogleAuthProvider.credential).toHaveBeenCalledWith('mock-id-token');
    await waitFor(() => {
      expect(signInWithCredential).toHaveBeenCalledTimes(1);
    });
  });

  it('faz login anônimo quando o botão "Entrar como Convidado" é pressionado', async () => {
    render(<LoginScreen />);
    await act(async () => {
      fireEvent.press(screen.getByText(/entrar como convidado/i));
    });
    await waitFor(() => {
      expect(signInAnonymously).toHaveBeenCalledTimes(1);
    });
  });

  it('faz login com email e senha quando o formulário é submetido', async () => {
    render(<LoginScreen />);

    // Mostrar formulário email
    await act(async () => {
      fireEvent.press(screen.getByText(/entrar com email/i));
    });

    // Preencher campos email e senha
    fireEvent.changeText(screen.getByPlaceholderText(/email/i), 'teste@gmail.com');
    fireEvent.changeText(screen.getByPlaceholderText(/senha/i), 'aaaaaa');

    // Submeter formulário
    await act(async () => {
      fireEvent.press(screen.getByText(/^entrar$/i)); // botão 'Entrar' dentro do formulário
    });

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(), // auth objeto
        'teste@gmail.com',
        'aaaaaa'
      );
    });
  });

  it('navega para tela de cadastro ao pressionar "Criar conta"', async () => {
    render(<LoginScreen />);
    fireEvent.press(screen.getByText(/criar conta/i));
    expect(router.navigate).toHaveBeenCalledWith('/cadastrar');
  });

  it('navega para tela de "Esqueceu a Senha?" corretamente', async () => {
    render(<LoginScreen />);
    await act(async () => {
      fireEvent.press(screen.getByText(/entrar com email/i));
    });
    fireEvent.press(screen.getByText(/esqueceu a senha\?/i));
    expect(router.navigate).toHaveBeenCalledWith('/codigo');
  });
});