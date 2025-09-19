// importando as bibliotecas necessarias para execução do código

import UserInfoDisplay from '@/components/UserInfoDisplay';
import VoltaInicio from '@/components/VoltaInicio';
import { StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';



// Função responsavel por carregar todo conteudo da pagina (Pagina principal: Dados Colorimetro).

export default function CadastroReacao() {
  const handleCadastrar = () => {
    console.log('Botão CADASTRAR pressionado');
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
              />
            
            </View>

          <View style = {styles.div_alinha_linha}>

              <Text style={{fontWeight: 'bold'}}>Composto 1: </Text>
              
              <TextInput
              testID='composto_1' 
              style = {styles.botao} 
              />
            
            </View>
          
            <View style = {styles.div_alinha_linha}>

              <Text style={{fontWeight: 'bold'}}>Quantidade Composto 1:</Text>
              
              <TextInput
              testID='quantidade_composto_1'
              style = {styles.botao} 
              />
            
            </View>

            <View style = {styles.div_alinha_linha}>

              <Text style={{fontWeight: 'bold'}}>Composto 2:</Text>
              
              <TextInput
              testID='composto_2'
              style = {styles.botao} 
              />
            
            </View>
            <View style = {styles.div_alinha_linha}>

              <Text style={{fontWeight: 'bold'}}>Quantidade Composto 2:</Text>
              
              <TextInput
              testID='quantidade_composto_2'
              style = {styles.botao} 
              />
            
            </View>

            <View style = {styles.div_alinha_linha}>

              <Text style={{fontWeight: 'bold'}}>Descrição da reação:</Text>
              
              <TextInput multiline
              testID='descricao_da_reacao'
              style = {styles.botaoDescricao} 
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