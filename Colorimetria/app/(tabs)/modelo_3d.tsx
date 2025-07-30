// Importando as bibliotecas necessárias para o código
import React from 'react';
import {StyleSheet, View, SafeAreaView, Text, Dimensions, TouchableOpacity, FlatList} from 'react-native';
import UserInfoDisplay from '@/components/UserInfoDisplay';
import VoltaInicio from '@/components/VoltaInicio';

const { height } = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

// Chamando a função principal (necessário para abrir o menu principal)
export default function HomeScreen() {
  // O que será mostrado na tela
  return (
      // Container do app (onde ficará toda a view)
      <SafeAreaView style={styles.titleContainer}>
        <VoltaInicio></VoltaInicio>
        {/* Título "Modelo 3D: Colorímetro" */}
        <View style={{marginBottom: height * 0.05, marginTop: height * 0.1}}>
          <Text style={{fontSize: 30, fontWeight: "bold", textAlign: "center"}}>Modelo 3D: Colorímetro</Text>
        </View>

        <View style={{marginBottom: height * 0.1}}>
            <Text>ESPAÇO PARA MODELO 3D DO COLORÍMETRO</Text>
        </View>

        {/* View para mostrar a lista de componentes utilizados para o colorímetro */}
        <View style={{width: '80%', marginBottom: height * 0.1}}>
            <Text style={{marginBottom: 20, fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline', textAlign: 'center'}}>LISTA DE COMPONENTES UTILIZADOS:</Text>
            <FlatList
                data={[
                { key: '2 pilhas AA' },
                { key: 'EC2 Macho + Fêmea' },
                { key: 'Módulo Bluetooth Hc-05' },
                { key: 'Kit Arduino Iniciante' },
                { key: 'Plástico preto' },
                { key: 'Cubeta em vidro óptico 2 faces polidas 7 mL' },
                { key: 'LED branco 5 mm' },
                { key: 'Suporte para 2 pilhas AA' },
                { key: 'Sensor TCS3472' }
                ]}
                renderItem={({ item }) => {
                return (
                    <View style={{marginBottom: 10}}>
                    <Text style={{ fontSize: 16, textAlign: 'center' }}>{`\u2022 ${item.key}`}</Text>
                    </View>
                );
                }}
            />
        </View>

        <UserInfoDisplay userName='Matheus Tonini dos Santos'></UserInfoDisplay> {/* Seção com as informações do usuário, junto com o botão para sair do app */}
      </SafeAreaView>
  );
} 

// Estilos da página
const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
});
