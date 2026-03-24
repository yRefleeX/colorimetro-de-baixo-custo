/*
O arquivo VoltaInicio.tsx serve para mostrar uma seta, a qual funciona para voltar à tela inicial.
Como ele será utilizado em diversas telas, foi utilizado uma const, na qual funcionará como uma "tag".
Caso queira utilizá-lo em alguma tela, basta digitar <VoltaInicio></VoltaInicio>
*/

// Importando as bibliotecas necessárias para o código
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {router} from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Função para sair do app
function voltarTelaInicial(){
    router.navigate('/inicial')
}

// Definindo o VoltaInicio como uma constante, na qual possuirá o nome do usuário e o botão para sair do app
const VoltaInicio = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.arrowContainer, {top: insets.top, left: insets.left}]}>
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
    width: '90%',
  }
});

// Exportação do display para que seja possível utilizá-lo em diversas telas diferentes
export default VoltaInicio;