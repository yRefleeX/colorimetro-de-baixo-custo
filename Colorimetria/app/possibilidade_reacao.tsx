// Importando as bibliotecas necessárias para o código
import React, {TouchableOpacity, StyleSheet, View, SafeAreaView, Text, Dimensions} from 'react-native';
import UserInfoDisplay from '@/components/UserInfoDisplay';
import VoltaInicio from '@/components/VoltaInicio';

const { height } = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

// Chamando a função principal (necessário para abrir a tela "Possibilidade de reação")
export default function PossibilidadeReacaoScreen() {
  // O que será mostrado na tela
  return (
      // Container do app (onde ficará toda a view)
      <SafeAreaView style={styles.container}>
        <VoltaInicio></VoltaInicio>
        {/* Título "Possibilidade de reação" */}
        <View style={{marginBottom: height * 0.05, marginTop: height * 0.1}}>
          <Text style={{fontSize: 30, fontWeight: "bold", textAlign: "center"}}>Possibilidade de reação</Text>
          <Text>Concentração inicial do colorimetro: </Text> 
          <TouchableOpacity style = {styles.botao}><Text style={styles.buttonText}>SALVAR</Text></TouchableOpacity>
          <Text>Concentração final do colorimetro: </Text> 
          <TouchableOpacity style = {styles.botao}><Text style={styles.buttonText}>SALVAR</Text></TouchableOpacity>
        </View>
        
        
        <View style={styles.conteudo}>
            <Text style={{textAlign:'center'}}>CONTEÚDO</Text>

            <Text>Aqui ficara a descrição da probabilidade de reação a partir dos dados coletados e uma breve explicação</Text>

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
    botao:{
      padding:5,
      width:100,
      borderRadius: 15,
      borderWidth: 1,
      marginTop:20,
  },
    buttonText: {
    fontSize: 16,
    textAlign: 'center'
  },
    conteudo:{
      padding:5,
      width:400,
      height:500,
      borderRadius: 15,
      borderWidth: 1,
      marginTop:20,
      marginBottom: height * 0.1
    }

});
