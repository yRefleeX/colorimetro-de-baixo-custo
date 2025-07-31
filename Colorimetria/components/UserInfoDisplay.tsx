/*
O arquivo UserInfoDisplay serve para mostrar as informações do usuário, juntamente com o botão para sair do app.
Como ele será utilizado em diversas telas, foi utilizado uma const, na qual funcionará como uma "tag".
Caso queira utilizá-lo em alguma tela, basta digitar <UserInfoDislay userName ='(Nome do usuário)'></UserInfoDisplay>
*/

// Importando as bibliotecas necessárias para o código
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {router} from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyB6rWreNwmi2e7osBqj3kn1yP0J_bGExaI",
  authDomain: "colorimetro-de-baixo-custo.firebaseapp.com",
  projectId: "colorimetro-de-baixo-custo",
  storageBucket: "colorimetro-de-baixo-custo.firebasestorage.app",
  messagingSenderId: "52158465405",
  appId: "1:52158465405:web:19668e5dcdf73e31957814",
  measurementId: "G-H3PS3E0QZF"
};

const {height} = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

interface UserInfoDisplayProps {
  userName: string; // Definindo o tipo da propriedade 'userName' para string
}

// Definindo o UserInfoDisplay como uma constante, na qual possuirá o nome do usuário e o botão para sair do app
const UserInfoDisplay = ({userName}: UserInfoDisplayProps) => {
  // Função para sair do app
  const logOut = async () => {
     try {
      // Inicializa o Firebase App com a sua configuração
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app); // Obtém a instância de autenticação

      await signOut(auth); // Desloga o usuário do Firebase
      console.log('Usuário deslogado com sucesso!');
      router.navigate('/'); // Redireciona para a tela de login após o logout
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro de Logout', 'Não foi possível fazer logout. Tente novamente.');
    }
  };

  return (
    <View style={styles.userInfoContainer}>
        <MaterialCommunityIcons name='account' size={50} color='black'></MaterialCommunityIcons>
        <Text style={styles.userInfoText}>Usuário: {userName || 'Convidado'}</Text>
        <TouchableOpacity style={styles.userLogout} onPress={logOut}>Sair</TouchableOpacity>
    </View>
  );
};

// Estilos do display
const styles = StyleSheet.create({
  userInfoContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: height * 0,
    width: '90%',
    justifyContent: 'center',
  },
  userInfoText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc"
  },
  userLogout: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 15,
    color: '#852221',
    fontWeight: 'bold'
  }
});

// Exportação do display para que seja possível utilizá-lo em diversas telas diferentes
export default UserInfoDisplay;