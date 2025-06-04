// importando as bibliotecas necessarias para execução do código

import { StyleSheet, Text, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';



// Função responsavel por carregar todo conteudo da pagina (Pagina principal: Dados Colorimetro).

export default function DadosColorimetro() {
 
  
// Função responsavel por exportar em pdf ou word os dados obtidos pelo colorimetro.

  function exportarDocumentos(tipo: String){

  }
 
  return (

//Div 'Mãe" da pagina -> Todo conteudo estara dentro desse SafeAreaView, restringindo o conteudo exibido da barra de navegação na parte inferior até o cabeçalho de notificações.    

    <SafeAreaView>

      <SafeAreaView style={styles.div_titulo}>

        <Text style={styles.title_page}><b>Dados Coletados</b></Text>
      
      </SafeAreaView>


      <SafeAreaView style={styles.div_conteudo}>

        <Text><b>Concentração:</b></Text>

        <Text><b>Ph:</b></Text>

        <Text style ={{marginTop:10, marginBottom:10}}><b>Compostos utilizados:</b></Text>

        <SafeAreaView style = {styles.div_alinha_coluna}>
         
          <SafeAreaView style = {styles.div_alinha_linha}>

             <Text><b>1° Composto:</b></Text>
             <TouchableOpacity style = {styles.botao} onPress={exportarDocumentos('PDF')}>EXPORTAR</TouchableOpacity>

          </SafeAreaView>

          <SafeAreaView style = {styles.div_alinha_linha}>

            <Text><b>2° Composto:</b></Text>
             <TouchableOpacity style = {styles.botao} onPress={exportarDocumentos('PDF')}>EXPORTAR</TouchableOpacity>
          </SafeAreaView>
          

        </SafeAreaView>

        <SafeAreaView style = {styles.div_alinha_coluna}>
          
          <SafeAreaView style = {styles.div_alinha_linha}>

            <Image style = {styles.images} source={require('../../assets/images/PDF.png')}/>
            <TouchableOpacity style = {styles.botao} onPress={exportarDocumentos('PDF')}>EXPORTAR</TouchableOpacity>
          
          </SafeAreaView>

          <SafeAreaView style = {styles.div_alinha_linha}>

            <Image style = {styles.images} source={require('../../assets/images/DOCS.png')}/>
            <TouchableOpacity style = {styles.botao} onPress={exportarDocumentos('DOCS')}>EXPORTAR</TouchableOpacity>

          </SafeAreaView>

        </SafeAreaView>

      </SafeAreaView>

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

    justifyContent:'center',
    alignItems:'center',
    padding:40, 
    margin: 40
    
 },

  div_conteudo:{
    
    justifyContent:'center',
    alignItems:'flex-start',
    paddingLeft: '10%',
    backgroundColor:'green',
  },

  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  
  images:{
      width:30,
      height:30,
      padding:5,
      margin:5,
  },
  botao:{
      padding:5,
      backgroundColor:'red',
      borderRadius: 15,
      borderWidth: 1,
  },
  div_alinha_coluna:{
      marginTop:50,
      padding:5,
      flexDirection:'column',
      backgroundColor:'gray',
  },

  div_alinha_linha:{
      marginTop:5,
      padding:5,
      flexDirection:'row',
  },

});
