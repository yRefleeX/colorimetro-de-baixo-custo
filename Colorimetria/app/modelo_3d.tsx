// Importando as bibliotecas necessárias para o código
import React from 'react';
import {StyleSheet, View, SafeAreaView, Text, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import UserInfoDisplay from '@/components/UserInfoDisplay';
import VoltaInicio from '@/components/VoltaInicio';
import * as WebBrowser from 'expo-web-browser';

const { height } = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

// Chamando a função principal (necessário para abrir a tela "visualizar colorímetro 3D")
export default function ViewColorimeterScreen() {

  const abrirModelo3DBrowser = async () => {
    const sketchfabUrl = 'https://sketchfab.com/3d-models/colorimetro-3d-a937d20399c14130ac97ad31384d8e6d';
    await WebBrowser.openBrowserAsync(sketchfabUrl);
  };

  // O que será mostrado na tela
  return (
      // Container do app (onde ficará toda a view)
      <SafeAreaView style={styles.container}>
        <VoltaInicio></VoltaInicio>
        {/* Título "Modelo 3D: Colorímetro" */}
        <View style={{marginBottom: height * 0.05, marginTop: height * 0.1}}>
          <Text style={{fontSize: 30, fontWeight: "bold", textAlign: "center"}}>Modelo 3D: Colorímetro</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={abrirModelo3DBrowser}>
            <Text style={styles.buttonText}>Ver Modelo 3D Interativo</Text>
        </TouchableOpacity>

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
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 20,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
