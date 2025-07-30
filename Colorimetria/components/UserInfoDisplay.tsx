/*
O arquivo UserInfoDisplay serve para mostrar as informações do usuário, juntamente com o botão para sair do app.
Como ele será utilizado em diversas telas, foi utilizado uma const, na qual funcionará como uma "tag".
Caso queira utilizá-lo em alguma tela, basta digitar <UserInfoDislay userName ='(Nome do usuário)'></UserInfoDisplay>
*/

// Importando as bibliotecas necessárias para o código
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {router} from 'expo-router';

const {height} = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

interface UserInfoDisplayProps {
  userName: string; // Definindo o tipo da propriedade 'userName' para string
}

// Função para sair do app
function logOut(){
    router.navigate('/(tabs)')
}

// Definindo o UserInfoDisplay como uma constante, na qual possuirá o nome do usuário e o botão para sair do app
const UserInfoDisplay = ({userName}: UserInfoDisplayProps) => {
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