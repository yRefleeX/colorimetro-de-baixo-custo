import favicon{Image} from './assets/favicon.png';
import { Platform, StyleSheet, Text, SafeAreaView, Image } from 'react-native';




export default function TabTwoScreen() {
  return (
      
    <SafeAreaView>

       <SafeAreaView style={styles.div_titulo}>

        <Text style={styles.title_page}>Dados Coletados</Text>
      
      </SafeAreaView>


       <SafeAreaView style={styles.div_conteudo}>

        <Text>Concentração:</Text>

        <Text>Ph:</Text>

        <Text style ={{marginTop:10, marginBottom:10}}>Compostos utilizados:</Text>


        <Text>1° Composto:</Text>

        <Text>2° Composto:</Text>

        <Image source={require('../../assets/images/icon.png')}/>
        <Image source={require('../../assets/images/favicon.png')}/>
      
      </SafeAreaView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  
  title_page: {

      fontSize: 20,

  },

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
});
