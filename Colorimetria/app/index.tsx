// Importando as bibliotecas necessárias para o código
import React, {useState, useEffect} from 'react';
import {router} from 'expo-router';
import {StyleSheet, SafeAreaView, Text, Image, TextInput, TouchableOpacity, Dimensions, View, Alert, ActivityIndicator} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { initializeApp } from 'firebase/app';
import {getAuth, signInWithEmailAndPassword, onAuthStateChanged, User} from 'firebase/auth';

const { height } = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

// Declaração da constante 'schema', que será utilizada pela função yupResolver para verificar se o que o usuário digitou está correto
const schema = yup.object({
  email: yup.string().email("Digite um email válido!").required("Digite seu email."),
  password: yup.string().required("Digite sua senha.")
})

const firebaseConfig = {
  apiKey: "AIzaSyB6rWreNwmi2e7osBqj3kn1yP0J_bGExaI",
  authDomain: "colorimetro-de-baixo-custo.firebaseapp.com",
  projectId: "colorimetro-de-baixo-custo",
  storageBucket: "colorimetro-de-baixo-custo.firebasestorage.app",
  messagingSenderId: "52158465405",
  appId: "1:52158465405:web:19668e5dcdf73e31957814",
  measurementId: "G-H3PS3E0QZF"
};

// Chamando a função principal (necessário para abrir a tela de login)
export default function LoginScreen() {
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento inicial para autenticação
  const [auth, setAuth] = useState<any>(null); // Instância do Auth

  const {control, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema), // Utilização do yupResolver para validação os dados
    defaultValues: { // Valores padrão para os campos do formulário
      email: '',
      password: ''
    }
  })

  // --- Inicialização do Firebase Auth ---
  useEffect(() => {
    const initFirebaseAuth = async () => {
      try {
        // Acessa diretamente a configuração fornecida
        const app = initializeApp(firebaseConfig);
        const firebaseAuth = getAuth(app);
        setAuth(firebaseAuth);

        // Observa mudanças no estado de autenticação
        const unsubscribeAuth = onAuthStateChanged(firebaseAuth, (user) => {
          setLoading(false); // Autenticação pronta
          if (user) {
            console.log('Usuário autenticado:', user.uid);
            // Se o usuário já estiver logado, navega para a tela principal
            router.navigate('/inicial');
          } else {
            console.log('Nenhum usuário autenticado.');
          }
        });

        return () => unsubscribeAuth(); // Limpa o listener ao desmontar
      } catch (error) {
        console.error('Erro ao inicializar Firebase Auth:', error);
        Alert.alert('Erro', 'Não foi possível inicializar o sistema de autenticação.');
        setLoading(false);
      }
    };

    initFirebaseAuth();
  }, []);
  
  // Função para entrar na tela inicial após o login
  const handleSignIn = async (data: {email: string; password: string}) => {
    if(!auth){
      Alert.alert('Erro', 'Sistema de autenticação não inicializado.');
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      // A navegação para /home será tratada pelo onAuthStateChanged
    } catch (error: any) {
      console.error('Erro ao fazer login:', error.code, error.message);
      let errorMessage = 'Erro ao fazer login. Verifique suas credenciais.';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'E-mail inválido.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'Usuário desativado.';
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'E-mail ou senha incorretos.';
      }
      Alert.alert('Erro de Login', errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // Renderização condicional para o estado de carregamento
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando autenticação...</Text>
      </View>
    );
  }


  // O que será mostrado na tela
  return (
      // Container do app (onde ficará toda a view)
      <SafeAreaView style={styles.titleContainer}>

        {/* Logo do IFSP, junto com o título (nome do app) */}
        <View>
          <Image source={require('../assets/images/foto_login.png')}></Image>
          <Text style={{fontSize: 30, fontWeight: "bold", textAlign: "center", marginBottom: height * 0.08}}>COEGI</Text>
        </View>

        {/* View com inputs para login */}
        <View>
          <Controller control={control} name="email" render={({field: {onChange, onBlur, value, }}) => (<TextInput style={[styles.input, {borderColor: errors.email && 'red'}]} onChangeText={onChange} onBlur={onBlur} value={value} placeholder='Email'></TextInput>)}/>{errors.email && <Text style={styles.errorMessage}>{errors.email.message}</Text>}
          <Controller control={control} name="password" render={({field: {onChange, onBlur, value, }}) => (<TextInput style={[styles.input, {borderColor: errors.password && 'red'}]} onChangeText={onChange} onBlur={onBlur} value={value} placeholder='Senha' secureTextEntry={true}></TextInput>)}/>{errors.password && <Text style={styles.errorMessage}>{errors.password.message}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleSubmit(handleSignIn)} disabled={loading}><Text style={styles.buttonText}>Entrar</Text></TouchableOpacity>
        </View>

        <TouchableOpacity style={{top: height * 0.1}}><Text style={{color: '#0000FF', fontWeight: 'bold'}}>Esqueceu a Senha?</Text></TouchableOpacity> {/* Botão para entrar no app */}
      </SafeAreaView>
  );
} 

// Estilos da página
const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    top: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  input: {
    borderWidth: 0.5,
    margin: 5,
    padding: 10
  },
  button: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#EADDFF',
  },
  buttonText: {
    color: '#4F378A',
    fontWeight: 'bold'
  },
  errorMessage: {
    color: 'red'
  }
});
