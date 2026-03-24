import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Dimensions,
  ScrollView,
  Alert,
  Image
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

  // Lei de Beer
  const [epsilon, setEpsilon] = useState('1');
  const [caminhoOptico, setCaminhoOptico] = useState('1');

  // Bluetooth
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);

  // Leituras
  const [leiturasBrutas, setLeiturasBrutas] = useState<number[]>([]);
  const [absorbancias, setAbsorbancias] = useState<number[]>([]);
  const [concentracoes, setConcentracoes] = useState<number[]>([]);

  // Baseline
  const [baseline, setBaseline] = useState<number | null>(null);

  // Canal selecionado
  const [canal, setCanal] = useState<'R' | 'G' | 'B'>('G');

  // ________________________________________________
  // 🔌 CONEXÃO BLUETOOTH
  // ________________________________________________
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
      Alert.alert('Erro', String(error));
    }
  };

  // ________________________________________________
  // 📡 RECEBER E PROCESSAR DADOS
  // ________________________________________________
  useEffect(() => {
    if (!connectedDevice) return;

    const subscription = connectedDevice.onDataReceived((event) => {
      const data = event.data?.trim();
      if (!data) return;

      // Regex para extrair valores
      const regexR = /Int R\s+(\d+)/i;
      const regexG = /Int V\s+(\d+)/i; // V = verde
      const regexB = /Int Z\s+(\d+)/i; // Z = azul

      const rMatch = data.match(regexR);
      const gMatch = data.match(regexG);
      const bMatch = data.match(regexB);

      let canalValor: number | null = null;

      if (canal === "R" && rMatch) canalValor = parseFloat(rMatch[1]);
      if (canal === "G" && gMatch) canalValor = parseFloat(gMatch[1]);
      if (canal === "B" && bMatch) canalValor = parseFloat(bMatch[1]);

      if (canalValor === null) return;

      // 🔹 Sempre armazenar leituras brutas
      setLeiturasBrutas(prev => [...prev, canalValor]);

      // 🔹 Se ainda não temos baseline, não processa absorbância
      if (baseline === null) return;

      // 🔹 Evitar divisão por zero
      if (baseline <= 0) {
        console.warn("⚠️ Baseline inválido. Capturar novamente.");
        return;
      }

      // Cálculo da absorbância: A = -log10(I / I0)
      const absorbancia = -Math.log10(canalValor / baseline);
      setAbsorbancias(prev => [...prev, absorbancia]);

      // Cálculo da concentração: C = A / (ε * l)
      const epsNum = parseFloat(epsilon);
      const lNum = parseFloat(caminhoOptico);
      if (epsNum > 0 && lNum > 0) {
        const concentracao = absorbancia / (epsNum * lNum);
        setConcentracoes(prev => [...prev, concentracao]);
      }
    });

    return () => subscription.remove();
  }, [connectedDevice, baseline, canal, epsilon, caminhoOptico]);

  // ________________________________________________
  // 📌 CAPTURAR BASELINE
  // ________________________________________________
  const capturarBaseline = () => {
    if (!leiturasBrutas.length) {
      Alert.alert("Erro", "Nenhuma leitura recebida ainda.");
      return;
    }

    const ultima = leiturasBrutas[leiturasBrutas.length - 1];

    if (ultima <= 0) {
      Alert.alert("Erro", "Valor inválido para baseline.");
      return;
    }

    setBaseline(ultima);
    Alert.alert("Baseline capturado", `I0 = ${ultima}`);
  };

  // ________________________________________________
  // 📄 EXPORTAR PDF
  // ________________________________________________
  const exportarDocumentos = async () => {
    const html = `
      <html>
        <body>
          <h1>Colorímetro – Dados Coletados</h1>
          <p><strong>Composto 1:</strong> ${composto1}</p>
          <p><strong>Composto 2:</strong> ${composto2}</p>
          <p><strong>ε:</strong> ${epsilon}</p>
          <p><strong>l:</strong> ${caminhoOptico} cm</p>
          <p><strong>Canal utilizado:</strong> ${canal}</p>
          <p><strong>Baseline (I0):</strong> ${baseline ?? "Não definido"}</p>

          <h3>Resultados</h3>
          <table border="1" cellpadding="5">
            <tr>
              <th>Absorbância</th>
              <th>Concentração (mol/L)</th>
            </tr>
            ${absorbancias.map((a, i) =>
              `<tr><td>${a.toFixed(4)}</td><td>${concentracoes[i]?.toFixed(4) ?? "-"}</td></tr>`
            ).join('')}
          </table>
        </body>
      </html>
    `;

    const file = await printToFileAsync({ html, base64: false });
    await shareAsync(file.uri);
  };

  // ________________________________________________
  // UI
  // ________________________________________________
  return (
    <SafeAreaView style={styles.container}>
      <VoltaInicio />

      <View style={styles.div_titulo}>
        <Text style={styles.title}> Dados Coletados</Text>
      </View>

      <View style={styles.box}>
        {/* Campos */}
        <Text style={styles.label}>Compostos utilizados:</Text>
        <TextInput style={styles.input} placeholder="1º composto" value={composto1} onChangeText={setComposto1} />
        <TextInput style={styles.input} placeholder="2º composto" value={composto2} onChangeText={setComposto2} />

        <TextInput style={styles.input} keyboardType="numeric" value={epsilon} onChangeText={setEpsilon} placeholder="ε coef. molar" />
        <TextInput style={styles.input} keyboardType="numeric" value={caminhoOptico} onChangeText={setCaminhoOptico} placeholder="l (cm)" />

        {/* Canal RGB */}
        <Text style={styles.label}>Canal RGB:</Text>
        <View style={styles.row}>
          {['R', 'G', 'B'].map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.btnSmall, canal === c && [styles.btnSelected, {backgroundColor: c === 'R' ? '#ffd0d0' : c === 'G' ? '#d0ffd0' : '#d0d0ff' }]]}
              onPress={() => setCanal(c as 'R' | 'G' | 'B')}
            >
              <Text>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botões */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={connectBluetooth}>
            <Text>{connectedDevice ? `Conectado a ${connectedDevice.name}` : "Conectar Bluetooth"}</Text>
          </TouchableOpacity>

         <TouchableOpacity style={styles.btn} onPress={exportarDocumentos}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={styles.images} source={require('../assets/images/PDF.png')} />
              <Text style={{ marginLeft: 5 }}>Exportar PDF</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Capturar Baseline */}
        <TouchableOpacity style={[styles.btn, styles.btnBlue]} onPress={capturarBaseline}>
          <Text style={{ textAlign: 'center', color: "white", fontWeight: "bold" }}>
            Capturar Baseline (I0)
          </Text>
        </TouchableOpacity>

        <Text style={styles.baselineLabel}>
          Baseline atual: {baseline ?? "não definido"}
        </Text>

        {/* Leituras */}
        <Text style={styles.label}>Leituras:</Text>
        <ScrollView style={styles.dataBox}>
          {absorbancias.map((a, i) => (
            <Text key={i}>
              A = {a.toFixed(4)} → C = {concentracoes[i]?.toFixed(4) ?? "-"} mol/L
            </Text>
          ))}
        </ScrollView>
      </View>

      <UserInfoDisplay />
    </SafeAreaView>
  );
}

// ________________________________________________
// 🎨 ESTILOS
// ________________________________________________
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  div_titulo: { marginTop: 30, marginBottom: 20 },
  box: { width: '90%', borderWidth: 1, padding: 10, borderRadius: 10 },
  label: { marginTop: 10, fontWeight: 'bold' },
  input: { borderWidth: 1, padding: 8, borderRadius: 10, marginTop: 5 },
  row: { flexDirection: "row", marginTop: 10, justifyContent: "space-around" },
  btn: { padding: 10, borderWidth: 1, borderRadius: 10 },
  btnSmall: { padding: 10, borderWidth: 1, borderRadius: 10, width: 50, alignItems: "center" },
  btnSelected: { borderWidth: 2, borderColor: "#000" },
  btnBlue: { backgroundColor: "#007bff", marginTop: 10 },
  dataBox: { marginTop: 10, maxHeight: 200, borderWidth: 1, padding: 5 },
  baselineLabel: { marginTop: 5, fontStyle: "italic" }, 
  images: { width: 30, height: 30, }
});