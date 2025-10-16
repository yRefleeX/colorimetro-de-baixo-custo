import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  View,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';

import VoltaInicio from '@/components/VoltaInicio';
import UserInfoDisplay from '@/components/UserInfoDisplay';

const { height } = Dimensions.get('window'); // ✅ Mantém apenas aqui!

export default function DadosColorimetro() {
  const [composto1, setComposto1] = useState('');
  const [composto2, setComposto2] = useState('');
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const [receivedData, setReceivedData] = useState<string[]>([]);

  const connectBluetooth = async () => {
    try {
      const isEnabled = await RNBluetoothClassic.isBluetoothEnabled();

      if (!isEnabled) {
        Alert.alert('Bluetooth', 'Ative o Bluetooth antes de conectar.');
        return;
      }

      const devices = await RNBluetoothClassic.getBondedDevices();

      const device = devices.find(
        (d) => d.name?.includes('HC') || d.name?.includes('BT')
      );

      if (!device) {
        Alert.alert('Erro', 'Nenhum módulo Bluetooth encontrado.');
        return;
      }

      await device.connect();
      setConnectedDevice(device);
      Alert.alert('Conectado', `Conectado a: ${device.name}`);

      const subscription = device.onDataReceived((event) => {
        const data = event.data?.trim();
        if (data) {
          setReceivedData((prev) => [...prev, data]);
        }
      });

      return () => subscription.remove();
    } catch (error) {
      console.error('Erro ao conectar Bluetooth:', error);
      Alert.alert('Erro', 'Falha ao conectar ao módulo Bluetooth.');
    }
  };

  const exportarDocumentos = async () => {
    const html = `
      <html>
        <body>
          <h1>Dados Coletados</h1>
          <p><strong>1° Composto:</strong> ${composto1}</p>
          <p><strong>2° Composto:</strong> ${composto2}</p>
          <h3>Leituras do Sensor:</h3>
          <pre>${receivedData.join('\n')}</pre>
        </body>
      </html>
    `;

    try {
      const file = await printToFileAsync({ html, base64: false });
      await shareAsync(file.uri);
    } catch (error) {
      Alert.alert('Erro', String(error));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <VoltaInicio />

      <View style={styles.div_titulo}>
        <Text style={styles.title_page}>Dados Coletados</Text>
      </View>

      <View style={styles.div_conteudo}>
        <Text style={{ fontWeight: 'bold' }}>Concentração:</Text>
        <Text style={{ fontWeight: 'bold' }}>Ph:</Text>

        <Text style={{ marginTop: 10, marginBottom: 10, fontWeight: 'bold' }}>
          Compostos utilizados:
        </Text>

        <View style={styles.div_alinha_coluna}>
          <View style={styles.div_alinha_linha}>
            <Text style={{ fontWeight: 'bold' }}>1° Composto:</Text>
            <TextInput style={styles.botao} value={composto1} onChangeText={setComposto1} />
          </View>

          <View style={styles.div_alinha_linha}>
            <Text style={{ fontWeight: 'bold' }}>2° Composto:</Text>
            <TextInput style={styles.botao} value={composto2} onChangeText={setComposto2} />
          </View>
        </View>

        <View style={styles.div_alinha_linha}>
          <TouchableOpacity style={styles.botao} onPress={connectBluetooth}>
            <Text style={styles.buttonText}>
              {connectedDevice ? `Conectado a ${connectedDevice.name}` : 'Conectar Bluetooth'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botao} onPress={exportarDocumentos}>
            <Image style={styles.images} source={require('../assets/images/PDF.png')} />
            <Text style={styles.buttonText}>EXPORTAR</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ marginTop: 20, fontWeight: 'bold' }}>📡 Dados do Sensor:</Text>
        <ScrollView style={styles.dataBox}>
          {receivedData.map((line, i) => (
            <Text key={i} style={{ fontSize: 14 }}>
              {line}
            </Text>
          ))}
        </ScrollView>
      </View>

      <UserInfoDisplay />
    </SafeAreaView>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  title_page: { fontSize: 30 },
  div_titulo: { marginBottom: height * 0.05, marginTop: height * 0.1 },
  div_conteudo: { borderWidth: 1, padding: 10, width: '90%' },
  container: { display: 'flex', alignItems: 'center', flex: 1 },
  images: { width: 30, height: 30, margin: 5 },
  botao: {
    padding: 8,
    borderRadius: 15,
    borderWidth: 1,
    marginHorizontal: 5,
  },
  div_alinha_coluna: { marginTop: 20, flexDirection: 'column' },
  div_alinha_linha: { marginTop: 5, flexDirection: 'row', alignItems: 'center' },
  buttonText: { fontSize: 16, textAlign: 'center' },
  dataBox: {
    marginTop: 10,
    maxHeight: 200,
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#f2f2f2',
  },
});