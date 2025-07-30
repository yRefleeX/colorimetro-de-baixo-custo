/*
O arquivo VoltaInicio serve para mostrar uma seta, a qual funciona para voltar à tela inicial.
Como ele será utilizado em diversas telas, foi utilizado uma const, na qual funcionará como uma "tag".
Caso queira utilizá-lo em alguma tela, basta digitar <VoltaInicio></VoltaInicio>
*/

// Importando as bibliotecas necessárias para o código
import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {router} from 'expo-router';

const {width, height} = Dimensions.get('window'); // Utilizando 'width' e 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

// Função para sair do app
function voltarTelaInicial(){
    router.navigate('/inicial')
}

// Definindo o VoltaInicio como uma constante, na qual possuirá o nome do usuário e o botão para sair do app
const VoltaInicio = () => {
  return (
    <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={voltarTelaInicial}>
            <MaterialCommunityIcons name='arrow-left' size={50} color='black'></MaterialCommunityIcons>
        </TouchableOpacity>
    </View>
  );
};

// Estilos do display
const styles = StyleSheet.create({
  arrowContainer: {
    position: 'absolute',
    flexDirection: 'row',
    top: height * 0,
    width: '90%',
    left: width * 0
  }
});

// Exportação do display para que seja possível utilizá-lo em diversas telas diferentes
export default VoltaInicio;