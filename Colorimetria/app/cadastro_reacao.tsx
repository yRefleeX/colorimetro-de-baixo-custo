// importando as bibliotecas necessarias para execução do código

import React, {useState} from 'react';
import UserInfoDisplay from '@/components/UserInfoDisplay';
import VoltaInicio from '@/components/VoltaInicio';
import { StyleSheet, Text, TouchableOpacity, TextInput, View, Alert } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {db} from '../firebaseConfig';
import {auth} from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

// Função responsavel por carregar todo conteudo da pagina (Pagina principal: Dados Colorimetro).

export default function CadastroReacao() {
  const [tipoReacao, setTipoReacao] = useState('');
  const [composto1, setComposto1] = useState('');
  const [quantidadeComposto1, setQuantidadeComposto1] = useState('');
  const [composto2, setComposto2] = useState('');
  const [quantidadeComposto2, setQuantidadeComposto2] = useState('');
  const [descricaoReacao, setDescricaoReacao] = useState('');

  const handleCadastrar = async () => {
    const currentUser = auth.currentUser;

    if(!currentUser){
      Alert.alert('Erro', 'Nenhum usuário logado. Por favor, faça login.');
      return;
    }

    const reactionData = {
      tipoReacao,
      composto1,
      quantidadeComposto1,
      composto2,
      quantidadeComposto2,
      descricaoReacao,
      timestamp: new Date(),
      userId: currentUser.uid
    };

    try {
      const userReactionsCollectionRef = collection(db, 'users', currentUser.uid, 'reacoes');

      await addDoc(userReactionsCollectionRef, reactionData);
      Alert.alert('Sucesso!', 'Reação cadastrada com sucesso!');
      
      // Limpar os campos após o cadastro
      setTipoReacao('');
      setComposto1('');
      setQuantidadeComposto1('');
      setComposto2('');
      setQuantidadeComposto2('');
      setDescricaoReacao('');

    }
    catch (error: any) {
      console.error('Erro ao cadastrar reação:', error);
      Alert.alert('Erro', `Falha ao cadastrar reação: ${error.message}`);
    }
  };
 
  return (

//Div 'Mãe" da pagina -> Todo conteudo estara dentro desse SafeAreaView, restringindo o conteudo exibido da barra de navegação na parte inferior até o cabeçalho de notificações.    

    <SafeAreaView style={styles.container}>
      <VoltaInicio></VoltaInicio>

        <View style={styles.div_titulo}>

          <Text style={styles.title_page}>Cadastro de Reações</Text>
        
        </View>


          <View style = {styles.div_alinha_coluna}>
            
            <View style = {styles.div_alinha_linha}>

              <Text style={{fontWeight: 'bold'}}>Tipo de Reação:</Text>
              
              <TextInput
                testID="tipo_reacao"
                style = {styles.botao}
                value = {tipoReacao}
                onChangeText={setTipoReacao}
              />
            
            </View>

          <View style = {styles.div_alinha_linha}>

              <Text style={{fontWeight: 'bold'}}>Composto 1: </Text>
              
              <TextInput
              testID='composto_1' 
              style = {styles.botao}
              value = {composto1}
              onChangeText = {setComposto1}
              />
            
            </View>
          
            <View style = {styles.div_alinha_linha}>

              <Text style={{fontWeight: 'bold'}}>Quantidade Composto 1:</Text>
              
              <TextInput
              testID='quantidade_composto_1'
              style = {styles.botao}
              value = {quantidadeComposto1}
              onChangeText = {setQuantidadeComposto1}
              />
            
            </View>

            <View style = {styles.div_alinha_linha}>

              <Text style={{fontWeight: 'bold'}}>Composto 2:</Text>
              
              <TextInput
              testID='composto_2'
              style = {styles.botao}
              value = {composto2}
              onChangeText = {setComposto2}
              />
            
            </View>
            <View style = {styles.div_alinha_linha}>

              <Text style={{fontWeight: 'bold'}}>Quantidade Composto 2:</Text>
              
              <TextInput
              testID='quantidade_composto_2'
              style = {styles.botao}
              value = {quantidadeComposto2}
              onChangeText = {setQuantidadeComposto2}
              />
            
            </View>

            <View style = {styles.div_alinha_linha}>

              <Text style={{fontWeight: 'bold'}}>Descrição da reação:</Text>
              
              <TextInput multiline
              testID='descricao_da_reacao'
              style = {styles.botaoDescricao} 
              value = {descricaoReacao}
              onChangeText = {setDescricaoReacao}
              />
            
            </View>

          </View>

          <View style = {{alignItems:'center', height: 90}}>
              <TouchableOpacity style = {styles.botao} onPress={handleCadastrar}><Text style={styles.buttonText}>CADASTRAR</Text></TouchableOpacity>
          </View>

          <UserInfoDisplay/>
      </SafeAreaView>

  );
}

// Estilização da pagina

const styles = StyleSheet.create({

// Estilização do titulo da pagina definindo o tamanho em 30;

  title_page: {

      fontSize: 30,
      fontWeight: 'bold'
  },

// Estilização da div contendo o titulo da pagina. Centralização dos itens contidos na div para o centro e espaçamento 

  div_titulo: {
    padding:30, 
    margin: 30
 },


  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1
  },
  
 
  botao:{
      padding:5,
      width: 150,
      borderRadius: 15,
      borderWidth: 1,
      marginTop:20,
  },
  
  div_alinha_coluna:{
      flexDirection:'column'
  },

  div_alinha_linha:{
      marginTop:5,
      padding:5,
      flexDirection:'row',
      justifyContent: 'space-between',
      borderWidth: 1,
  },

  botaoDescricao:{
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    height:50,
    borderRadius: 15,
    textAlignVertical: 'top',
     padding:5,
    borderWidth: 1,
    marginTop:20,

  },

  buttonText: {
    fontSize: 16,
    textAlign: 'center'
  }

});