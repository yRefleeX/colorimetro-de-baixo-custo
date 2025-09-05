// Importando as bibliotecas necessárias para o código
import React from 'react';
import {StyleSheet, View, SafeAreaView, Text, Dimensions, FlatList} from 'react-native';
import UserInfoDisplay from '@/components/UserInfoDisplay';
import VoltaInicio from '@/components/VoltaInicio';

const { height } = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

// Chamando a função principal (necessário para abrir a tela "visualizar colorímetro 3D")
export default function PossibilidadeReacaoScreen() {
  // O que será mostrado na tela
  return (
      // Container do app (onde ficará toda a view)
      <SafeAreaView style={styles.container}>
        <VoltaInicio></VoltaInicio>
        {/* Título "Modelo 3D: Colorímetro" */}
        <View style={{marginBottom: height * 0.05, marginTop: height * 0.1}}>
          <Text style={{fontSize: 30, fontWeight: "bold", textAlign: "center"}}>Possibilidade de reação</Text>
        </View>

        <View style={{marginBottom: height * 0.1}}>
            <Text>CONTEÚDO</Text>
        </View>

        <UserInfoDisplay/>
      </SafeAreaView>
  );
} 

// Estilos da página
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
});
