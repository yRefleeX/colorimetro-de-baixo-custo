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

const { height } = Dimensions.get('window');

export default function DadosColorimetro() {
  const [composto1, setComposto1] = useState('');
  const [composto2, setComposto2] = useState('');
  const [epsilon, setEpsilon] = useState('1'); // coeficiente molar
  const [caminhoOptico, setCaminhoOptico] = useState('1'); // em cm
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const [receivedData, setReceivedData] = useState<string[]>([]);
  const [concentracoes, setConcentracoes] = useState<number[]>([]);

  const connectBluetooth = async () => {
  try {
    const isEnabled = await RNBluetoothClassic.isBluetoothEnabled();
    if (!isEnabled) {
      Alert.alert('Bluetooth', 'Ative o Bluetooth antes de conectar.');
      return;
    }

    const devices = await RNBluetoothClassic.getBondedDevices();
    const device = devices.find((d) => d.name?.includes('HC'));
    if (!device) {
      Alert.alert('Erro', 'Nenhum módulo Bluetooth encontrado.');
      return;
    }

    await device.connect();
    setConnectedDevice(device);
    Alert.alert('Conectado', `Conectado a: ${device.name}`);
  } catch (error) {
    console.error('Erro ao conectar Bluetooth:', error);
    Alert.alert('Erro', String(error));
  }
};

// Listener que só ativa após conexão
useEffect(() => {
  if (!connectedDevice) return;
  const subscription = connectedDevice.onDataReceived((event) => {
    const data = event.data?.trim();

    if (data) {
      const match = data.match(/[-+]?\d*\.?\d+/);
      if (match) {
        const absorbancia = parseFloat(match[0]);
        const eps = parseFloat(epsilon);
        const l = parseFloat(caminhoOptico);
        const concentracao = absorbancia / (eps * l);
        setReceivedData((prev) => [...prev, `A=${absorbancia.toFixed(3)}`]);
        setConcentracoes((prev) => [...prev, concentracao]);
      } else {
        setReceivedData((prev) => [...prev, data]);
      }
    }
  });

  return () => {
    subscription.remove();
  };
}, [connectedDevice]);

  const exportarDocumentos = async () => {
    const html = `
      <html>
        <body>
          <h1>Dados Coletados</h1>
          <p><strong>1° Composto:</strong> ${composto1}</p>
          <p><strong>2° Composto:</strong> ${composto2}</p>
          <p><strong>ε (coef. molar):</strong> ${epsilon}</p>
          <p><strong>l (cm):</strong> ${caminhoOptico}</p>

          <h3>Leituras do Sensor (Lei de Lambert-Beer):</h3>
          <table border="1" cellpadding="5" cellspacing="0">
            <tr><th>Absorbância (A)</th><th>Concentração (C)</th></tr>
            ${concentracoes
              .map(
                (c, i) =>
                  `<tr><td>${receivedData[i]}</td><td>${c.toFixed(3)}</td></tr>`
              )
              .join('')}
          </table>
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
        <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>
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

          <View style={styles.div_alinha_linha}>
            <Text style={{ fontWeight: 'bold' }}>ε (coef. molar):</Text>
            <TextInput
              style={styles.botao}
              keyboardType="numeric"
              value={epsilon}
              onChangeText={setEpsilon}
            />
          </View>

          <View style={styles.div_alinha_linha}>
            <Text style={{ fontWeight: 'bold' }}>l (cm):</Text>
            <TextInput
              style={styles.botao}
              keyboardType="numeric"
              value={caminhoOptico}
              onChangeText={setCaminhoOptico}
            />
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

        <Text style={{ marginTop: 20, fontWeight: 'bold' }}>📡 Leituras:</Text>
        <ScrollView style={styles.dataBox}>
          {concentracoes.map((c, i) => (
            <Text key={i} style={{ fontSize: 14 }}>
              {receivedData[i]} → C = {c.toFixed(3)} mol/L
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
    minWidth: 80,
  },
  div_alinha_coluna: { marginTop: 10, flexDirection: 'column' },
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