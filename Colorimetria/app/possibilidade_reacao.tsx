import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserInfoDisplay from '@/components/UserInfoDisplay';
import VoltaInicio from '@/components/VoltaInicio';
import { db, auth } from '../firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";

const { height } = Dimensions.get('window');

export default function PossibilidadeReacaoScreen() {

  const [tipoReacao, setTipoReacao] = useState('');
  const [composto1, setComposto1] = useState('');
  const [composto2, setComposto2] = useState('');
  const [descricao, setDescricao] = useState("Preencha os campos para ver a descrição.");

  useEffect(() => {
    const fetchDescricao = async () => {
      const user = auth.currentUser;
      if (!user) return;

      if (tipoReacao && composto1 && composto2) {
        try {
          const reacoesRef = collection(db, 'users', user.uid, 'reacoes');
          const q = query(
            reacoesRef,
            where("tipoReacao", "==", tipoReacao),
            where("composto1", "==", composto1),
            where("composto2", "==", composto2)
          );

          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].data();
            setDescricao(data.descricaoReacao);
          } else {
            setDescricao("Nenhuma reação registrada com essa combinação.");
          }

        } catch (error: any) {
          console.error("Erro ao buscar reação:", error);
          setDescricao("Erro ao carregar a descrição.");
        }
      }
    };

    fetchDescricao();
  }, [tipoReacao, composto1, composto2]);

  return (
    <SafeAreaView style={styles.container}>
      <VoltaInicio />

      <View style={{ marginBottom: height * 0.05, marginTop: height * 0.1 }}>
        <Text style={styles.title}>Possibilidade de reação</Text>

        <Text style={styles.label}>Tipo de Reação:</Text>
        <TextInput
          style={styles.input}
          value={tipoReacao}
          onChangeText={setTipoReacao}
          placeholder="Ex.: Síntese"
        />

        <Text style={styles.label}>Composto 1:</Text>
        <TextInput
          style={styles.input}
          value={composto1}
          onChangeText={setComposto1}
          placeholder="Ex.: NaCl"
        />

        <Text style={styles.label}>Composto 2:</Text>
        <TextInput
          style={styles.input}
          value={composto2}
          onChangeText={setComposto2}
          placeholder="Ex.: AgNO₃"
        />
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.descTitle}>DESCRIÇÃO DA REAÇÃO</Text>
        <Text>{descricao}</Text>
      </View>

      <UserInfoDisplay />
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15
  },
  input: {
    width: 250,
    borderWidth: 1,
    borderRadius: 10,
    padding: 6,
    marginTop: 5
  },
  conteudo: {
    padding: 10,
    width: '80%',
    height: '40%',
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: height * 0.1
  },
  descTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5
  }
});