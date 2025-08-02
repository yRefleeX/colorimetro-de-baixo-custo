/*
O arquivo UserInfoDisplay.tsx serve para mostrar as informações do usuário, juntamente com o botão para sair do app.
Como ele será utilizado em diversas telas, foi utilizado uma const, na qual funcionará como uma "tag".
Caso queira utilizá-lo em alguma tela, basta digitar <UserInfoDislay/>
*/

// Importando as bibliotecas necessárias para o código
import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {router} from 'expo-router';
import {signOut, User, onAuthStateChanged } from 'firebase/auth';
import {auth} from '../firebaseConfig';

const {height} = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

interface UserInfoDisplayProps {
  userName: string; // Definindo o tipo da propriedade 'userName' para string
}

// Definindo o UserInfoDisplay como uma constante, na qual possuirá o nome do usuário e o botão para sair do app
const UserInfoDisplay = () => {
  const [userName, setUserName] = useState<string>('Carregando...');
  const [loading, setLoading] = useState(false);

  // Inicialização do Firebase dentro de useEffect
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserName(user.displayName || 'Usuário');
        } else {
          setUserName('Convidado');
        }
        setLoading(false);
      });

      return () => unsubscribe();
  }, []);
  // Função para sair do app
  const logOut = async () => {
     try {
        await signOut(auth); // Desloga o usuário do Firebase
        console.log('Usuário deslogado com sucesso!');
        router.navigate('/'); // Redireciona para a tela de login após o logout
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        Alert.alert('Erro de Logout', 'Não foi possível fazer logout. Tente novamente.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <View style={styles.userInfoContainer}>
        <MaterialCommunityIcons name='account' size={50} color='black'></MaterialCommunityIcons>
        <Text style={styles.userInfoText}>{loading ? (<ActivityIndicator size="small" color="#000" />) : (<Text style={styles.userInfoText}>{`Usuário: ${userName}`}</Text>)}</Text>
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