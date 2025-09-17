// Importando as bibliotecas necessárias para o código
import React, {useState, useEffect} from 'react';
import {router} from 'expo-router';
import {StyleSheet, Text, Image, TextInput, TouchableOpacity, Dimensions, View, Alert, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {auth} from '../firebaseConfig';
import {signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, signInAnonymously} from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const { height } = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

// Declaração da constante 'schema', que será utilizada pela função yupResolver para verificar se o que o usuário digitou está correto
const schema = yup.object({
  email: yup.string().email("Digite um email válido!").required("Digite seu email."),
  password: yup.string().required("Digite sua senha.")
})

// Chamando a função principal (necessário para abrir a tela de login)
export default function LoginScreen() {
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento inicial para autenticação
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false);

  const {control, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema), // Utilização do yupResolver para validação os dados
    defaultValues: { // Valores padrão para os campos do formulário
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB,
      scopes: ['profile', 'email', 'openid']
    });
  }, []);

  if (!process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB || !process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID) {
      const errorMessage = "Uma ou mais variáveis de ambiente cruciais para a autenticação não foram definidas. Verifique seu arquivo .env e reinicie o servidor com 'npx expo start -c'.";
      console.error("ERRO CRÍTICO DE CONFIGURAÇÃO:", errorMessage);
      Alert.alert("Erro de Configuração", errorMessage);
      return (
          <SafeAreaView style={styles.container}>
              <Text style={{color: 'red', padding: 20, textAlign: 'center'}}>Erro de Configuração. Verifique o console.</Text>
          </SafeAreaView>
      );
  }

  // Função para login com Google
  const handleNativeGoogleSignIn = async () => {
    try {
        setLoading(true);
        await GoogleSignin.hasPlayServices();
        
        const userInfo: any = await GoogleSignin.signIn();

        if (userInfo.data && userInfo.data.idToken) { 
            const credential = GoogleAuthProvider.credential(userInfo.data.idToken); 
            await signInWithCredential(auth, credential);
        } else {
            Alert.alert('Erro', 'Não foi possível obter o token do Google.');
        }

    } catch (error: any) {
        console.error("Erro no Login Google Nativo:", error);
        if (error.code === '12501') { 
            Alert.alert('Cancelado', 'Login com Google cancelado.');
        } else {
            Alert.alert('Erro', 'Um erro ocorreu no login com Google.');
        }
    } finally {
        setLoading(false);
    }
  };

  // Função para login como convidado
  const handleGuestSignIn = async () => {
    setLoading(true);
    try {
        await signInAnonymously(auth);
        // O redirecionamento é feito pelo _layout.tsx
    } catch (error) {
        console.error('Erro no login anônimo:', error);
        Alert.alert('Erro', 'Não foi possível entrar como convidado.');
    } finally {
        setLoading(false);
    }
  };

  // Função para entrar na tela inicial após o login
  const handleSignIn = async (data: {email: string; password: string}) => {
    if(!auth){
      Alert.alert('Erro', 'Sistema de autenticação não inicializado.');
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error: any) {
      console.error('Erro ao fazer login:', error.code, error.message);
      let errorMessage = 'Erro ao fazer login. Verifique suas credenciais.';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'E-mail inválido.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'Usuário desativado.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'E-mail ou senha incorretos.';
      }
      Alert.alert('Erro de Login', errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // O que será mostrado na tela
  return (
      // Container do app (onde ficará toda a view)
      <SafeAreaView style={styles.container}>

        {/* Logo do IFSP, junto com o título (nome do app) */}
        <View style={styles.content}>
          <Image source={require('../assets/images/foto_login.png')} style={styles.logo}></Image>
          <Text style={{fontSize: 30, fontWeight: "bold", textAlign: "center", marginBottom: height * 0.03}}>ChromaLab</Text>

          {/* View com inputs para login */}
          <View style={styles.formContainer}>
            {showEmailForm ? (
              // Formulário de Email e Senha
              <View>
                <Controller control={control} name="email" render={({field: {onChange, onBlur, value}}) => (<TextInput autoCapitalize='none' keyboardType='email-address' style={[styles.input, {borderColor: errors.email && 'red'}]} onChangeText={onChange} onBlur={onBlur} value={value} placeholder='Email'></TextInput>)}/>{errors.email && <Text style={styles.errorMessage}>{errors.email.message}</Text>}
                <Controller control={control} name="password" render={({field: {onChange, onBlur, value}}) => (<TextInput style={[styles.input, {borderColor: errors.password && 'red'}]} onChangeText={onChange} onBlur={onBlur} value={value} placeholder='Senha' secureTextEntry={true}></TextInput>)}/>{errors.password && <Text style={styles.errorMessage}>{errors.password.message}</Text>}
                <TouchableOpacity style={styles.button} onPress={handleSubmit(handleSignIn)} disabled={loading}>{loading ? <ActivityIndicator color="#4F378A" /> : <Text style={styles.buttonText}>Entrar</Text>}</TouchableOpacity>
                <TouchableOpacity style={styles.buttonVoltar} onPress={() => setShowEmailForm(false)} disabled={loading}><Text style={{color: '#555', fontSize: 16}}>Voltar</Text></TouchableOpacity>
                <View style={styles.footerLinks}>
                  <TouchableOpacity style={{top: height * 0.05}} onPress={() => router.navigate('/codigo')}><Text style={{color: '#0000FF', fontWeight: 'bold'}}>Esqueceu a Senha?</Text></TouchableOpacity>
                </View>
              </View>
            ) : (
              // Botões iniciais de login
              <View>
                <TouchableOpacity style={styles.button} onPress={() => setShowEmailForm(true)} disabled={loading}>{loading ? (<ActivityIndicator color="#555" />) : (<><MaterialCommunityIcons name='email' size={24} style={{marginRight: 12}}></MaterialCommunityIcons><Text style={styles.buttonText}>Entrar com Email</Text></>)}</TouchableOpacity>
                <TouchableOpacity style={styles.buttonGoogle} onPress={handleNativeGoogleSignIn} disabled={loading}>{loading ? (<ActivityIndicator color="#555" />) : (<><Image source={require('../assets/images/google-logo.png')} style={styles.googleIcon} /><Text style={styles.buttonTextGoogle}>Entrar com o Google</Text></>)}</TouchableOpacity>
                <TouchableOpacity style={styles.buttonGuest} onPress={handleGuestSignIn} disabled={loading}><Text style={styles.buttonGuestText}>Entrar como Convidado</Text></TouchableOpacity>

                <View style={styles.footerLinks}>
                  <TouchableOpacity style={[styles.button, {paddingVertical: 10}]} onPress={() => router.navigate('/cadastrar')} disabled={loading}><Text style={styles.buttonText}>Criar conta</Text></TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
  );
} 

// Estilos da página
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain', 
    marginBottom: 20
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  formContainer: {
      width: '100%',
      minHeight: 120
  },
  input: {
    borderWidth: 0.5,
    margin: 5,
    padding: 10
  },
  button: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EADDFF',
    marginTop: height * 0.01,
    flexDirection: 'row'
  },
  buttonVoltar: {
    marginTop: 15,
    alignItems: 'center'
  },
  buttonGoogle: {
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
    flexDirection: 'row'
  },
  buttonGuest: {
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    marginTop: 10
  },
  buttonText: {
    color: '#4F378A',
    fontWeight: 'bold',
    fontSize: 16
  },
  errorMessage: {
    color: 'red'
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12
  },
  buttonTextGoogle: {
    color: '#555',
    fontWeight: '500',
    fontSize: 16
  },
  buttonGuestText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 16
  },
  footerLinks: {
    width: '100%',
    alignItems: 'center',
    marginTop: 60
  }
});
