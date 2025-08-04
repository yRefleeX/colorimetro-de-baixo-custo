// importando as bibliotecas necessarias para execução do código

import { StyleSheet, Text, SafeAreaView, Image, TouchableOpacity, TextInput, View, Dimensions,} from 'react-native';
import VoltaInicio from '@/components/VoltaInicio';
import UserInfoDisplay from '@/components/UserInfoDisplay';

const { height } = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

// Função responsavel por carregar todo conteudo da pagina (Pagina principal: Dados Colorimetro).

export default function DadosColorimetro() {
 
  
// Função responsavel por exportar em pdf ou word os dados obtidos pelo colorimetro.

  function exportarDocumentos(tipo: String){

  }
 
  return (

//Div 'Mãe" da pagina -> Todo conteudo estara dentro desse SafeAreaView, restringindo o conteudo exibido da barra de navegação na parte inferior até o cabeçalho de notificações.    

    <SafeAreaView style={styles.container}>
      <VoltaInicio></VoltaInicio>


        <View style={styles.div_titulo}>

          <Text style={styles.title_page}><b>Dados Coletados</b></Text>
        
        </View>


        <View style={styles.div_conteudo}>

          <Text style={{fontWeight: 'bold'}}>Concentração:</Text>

          <Text style={{fontWeight: 'bold'}}>Ph:</Text>

          <Text style ={{marginTop:10, marginBottom:10, fontWeight: 'bold'}}>Compostos utilizados:</Text>

          <View style = {styles.div_alinha_coluna}>
          
            <View style = {styles.div_alinha_linha}>

              <Text style={{fontWeight: 'bold'}}>1° Composto:</Text>
              
              <TextInput 
              style = {styles.botao} 
              />

            </View>

            <View style = {styles.div_alinha_linha}>

              <Text style={{fontWeight: 'bold'}}>2° Composto:</Text>
              
              <TextInput 
              style = {styles.botao} 
              />

            </View>
            

          </View>

          <View style = {styles.div_alinha_coluna}>
            
            <View style = {styles.div_alinha_linha}>

              <Image style = {styles.images} source={require('../assets/images/PDF.png')}/>
              <TouchableOpacity style = {styles.botao} onPress={() => exportarDocumentos('PDF')}><Text style={styles.buttonText}>EXPORTAR</Text></TouchableOpacity>
            
            </View>

            <View style = {styles.div_alinha_linha}>

              <Image style = {styles.images} source={require('../assets/images/DOCS.png')}/>
              <TouchableOpacity style = {styles.botao} onPress={() => exportarDocumentos('DOCS')}><Text style={styles.buttonText}>EXPORTAR</Text></TouchableOpacity>

            </View>

          </View>
    
        </View>
      <UserInfoDisplay/> {/* Seção com as informações do usuário, junto com o botão para sair do app */}
    </SafeAreaView>

  );
}

// Estilização da pagina

const styles = StyleSheet.create({

// Estilização do titulo da pagina definindo o tamanho em 30;

  title_page: {

      fontSize: 30,

  },

// Estilização da div contendo o titulo da pagina. Centralização dos itens contidos na div para o centro e espaçamento 

  div_titulo: {
    marginBottom: height * 0.05,
    marginTop: height * 0.1
 },

  div_conteudo:{
    borderWidth: 1
  },

  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1
  },
  
  images:{
      width:30,
      height:30,
      padding:5,
      margin:5,
  },
  botao:{
      padding:5,

      borderRadius: 15,
      borderWidth: 1,
  },
  div_alinha_coluna:{
      marginTop:50,
      padding:5,
      flexDirection:'column'
  },

  div_alinha_linha:{
      marginTop:5,
      padding:5,
      flexDirection:'row',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center'
  }
});