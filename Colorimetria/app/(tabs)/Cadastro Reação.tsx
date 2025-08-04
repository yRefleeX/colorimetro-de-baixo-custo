// importando as bibliotecas necessarias para execução do código

import { StyleSheet, Text, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';



// Função responsavel por carregar todo conteudo da pagina (Pagina principal: Dados Colorimetro).

export default function CadastroReacao() {
 
  
// Função responsavel por exportar em pdf ou word os dados obtidos pelo colorimetro.

  function exportarDocumentos(tipo: String){

  }
 
  return (

//Div 'Mãe" da pagina -> Todo conteudo estara dentro desse SafeAreaView, restringindo o conteudo exibido da barra de navegação na parte inferior até o cabeçalho de notificações.    

    <SafeAreaView>

      <SafeAreaView style={styles.div_titulo}>

        <Text style={styles.title_page}><b>Cadastro de Reações</b></Text>
      
      </SafeAreaView>


        <SafeAreaView style = {styles.div_alinha_coluna}>
          
          <SafeAreaView style = {styles.div_alinha_linha}>

            <Text><b>Tipo de Reação:</b></Text>
            
            <TextInput 
             style = {styles.botao} 
             />
          
          </SafeAreaView>

         <SafeAreaView style = {styles.div_alinha_linha}>

            <Text><b>Composto 1: </b></Text>
            
            <TextInput 
             style = {styles.botao} 
             />
          
          </SafeAreaView>
        
          <SafeAreaView style = {styles.div_alinha_linha}>

            <Text><b>Quantidade Composto 1: </b></Text>
            
            <TextInput 
             style = {styles.botao} 
             />
          
          </SafeAreaView>

          <SafeAreaView style = {styles.div_alinha_linha}>

            <Text><b>Composto 2: </b></Text>
            
            <TextInput 
             style = {styles.botao} 
             />
          
          </SafeAreaView>
          <SafeAreaView style = {styles.div_alinha_linha}>

            <Text><b>Quantidade Composto 2: </b></Text>
            
            <TextInput 
             style = {styles.botao} 
             />
          
          </SafeAreaView>

        </SafeAreaView>

        <SafeAreaView style= {{alignItems:'Center',height: 90,}}>
             <TouchableOpacity style = {styles.botao}>EXPORTAR</TouchableOpacity>
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


  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  
 
  botao:{
      padding:5,
      width:100,
      borderRadius: 15,
      borderWidth: 1,
      marginTop:20,
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
      justifyContent: 'space-between',
      borderWidth: 1,
  },

});