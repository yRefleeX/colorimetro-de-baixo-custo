import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react-native';
import CadastrarScreen from '../app/cadastrar';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { router } from 'expo-router';

// Mock do Firebase
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: 'mockUser123' } })),
  updateProfile: jest.fn(() => Promise.resolve(true)),
  getAuth: jest.fn(() => ({})),
}));

// Mock do Router
jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
    replace: jest.fn(),
  },
}));

// Mock dos Ícones
jest.mock('@expo/vector-icons', () => ({
  MaterialCommunityIcons: () => null,
}));

describe('CadastrarScreen', () => {
  // Limpa os mocks (contagens de chamadas) antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Teste 1: Renderização (Este já estava correto)
  it('deve renderizar os campos de cadastro corretamente', () => {
    render(<CadastrarScreen />);
    
    expect(screen.getByPlaceholderText('Nome')).toBeTruthy();
    expect(screen.getByPlaceholderText('Email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Senha')).toBeTruthy();
    expect(screen.getByPlaceholderText('Confirmar Senha')).toBeTruthy();
    expect(screen.getByText('Enviar')).toBeTruthy(); 
  });

  // Teste 2: Caminho Feliz (Happy Path)
  it('deve criar um usuário, atualizar o perfil e redirecionar com sucesso', async () => {
    render(<CadastrarScreen />);

    // Preenche o formulário
    fireEvent.changeText(screen.getByPlaceholderText('Nome'), 'Andre Teste');
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'teste@novo.com');
    fireEvent.changeText(screen.getByPlaceholderText('Senha'), 'senha123');
    fireEvent.changeText(screen.getByPlaceholderText('Confirmar Senha'), 'senha123');

    // Submete o formulário
    await act(async () => {
      fireEvent.press(screen.getByText('Enviar'));
    });

    // Espera que o Firebase seja chamado
    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(), // o objeto 'auth'
        'teste@novo.com',
        'senha123'
      );
    });

    await waitFor(() => {
      expect(updateProfile).toHaveBeenCalledWith(
        expect.objectContaining({ uid: 'mockUser123' }), 
        { displayName: 'Andre Teste' } 
      );
    });

    expect(router.replace).toHaveBeenCalledWith('/inicial');
  });

  // Teste 3: Erro de Validação (Yup)
  it('deve mostrar um erro do Yup se as senhas não baterem', async () => {
    render(<CadastrarScreen />);

    fireEvent.changeText(screen.getByPlaceholderText('Nome'), 'Andre Teste');
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'teste@novo.com');
    fireEvent.changeText(screen.getByPlaceholderText('Senha'), 'senha123');
    fireEvent.changeText(screen.getByPlaceholderText('Confirmar Senha'), 'senha-errada-456');

    // Submete
    await act(async () => {
      fireEvent.press(screen.getByText('Enviar'));
    });

    // Procura pela mensagem de erro *exata* do seu schema Yup
    expect(await screen.findByText('Senha tem que ser igual')).toBeTruthy();

    // Garante que nenhuma chamada ao Firebase foi feita (usando as funções importadas)
    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
    expect(updateProfile).not.toHaveBeenCalled();
  });

  // Teste 4: Navegação (Voltar)
  it('deve navegar de volta para / ao pressionar Voltar', () => {
    render(<CadastrarScreen />);

    fireEvent.press(screen.getByText('Voltar'));
    expect(router.navigate).toHaveBeenCalledWith('/');
  });
});