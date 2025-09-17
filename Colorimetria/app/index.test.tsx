// app/index.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import LoginScreen from './index'; // Importa a tela de login
import { GoogleSignin } from '@react-native-google-signin/google-signin'; // Importamos o mock
import { signInWithCredential } from 'firebase/auth'; // Importamos o mock

// Descreve o conjunto de testes para a Tela de Login
describe('LoginScreen', () => {

  // Teste 1: Verifica se a tela renderiza corretamente no estado inicial
  it('renders correctly the initial state', () => {
    render(<LoginScreen />);
    
    // Verifica se o texto "ChromaLab" está na tela
    expect(screen.getByText('ChromaLab')).toBeTruthy();
    
    // Verifica se os botões iniciais estão presentes
    expect(screen.getByText('Entrar com Email')).toBeTruthy();
    expect(screen.getByText('Entrar com o Google')).toBeTruthy();
    expect(screen.getByText('Entrar como Convidado')).toBeTruthy();
  });

  // Teste 2: Verifica se o formulário de e-mail aparece ao clicar no botão
  it('shows email form when "Entrar com Email" is pressed', () => {
    render(<LoginScreen />);
    
    // Clica no botão "Entrar com Email"
    fireEvent.press(screen.getByText('Entrar com Email'));
    
    // Verifica se os campos de input (placeholders) apareceram
    expect(screen.getByPlaceholderText('Email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Senha')).toBeTruthy();
    // Verifica se o botão "Voltar" apareceu
    expect(screen.getByText('Voltar')).toBeTruthy();
  });

  // Teste 3: Verifica se o login com Google chama as funções corretas
  it('calls Google Sign-In and Firebase auth when Google button is pressed', async () => {
    render(<LoginScreen />);
    
    // Clica no botão "Entrar com o Google"
    fireEvent.press(screen.getByText('Entrar com o Google'));
    
    // Espera que o mock de signIn() tenha sido chamado
    expect(GoogleSignin.signIn).toHaveBeenCalledTimes(1);
    
    // Espera que o mock de signInWithCredential tenha sido chamado (assíncrono)
    // (Precisamos esperar que a promessa seja resolvida)
    await screen.findByText('Entrar com o Google'); // Espera a re-renderização
    expect(signInWithCredential).toHaveBeenCalledTimes(1);
  });
});