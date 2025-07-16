// Importando as bibliotecas necessárias para o código
import React from 'react';
import {router} from 'expo-router';
import {StyleSheet, SafeAreaView, Text, Image, TextInput, TouchableOpacity } from 'react-native';

// Chamando a função principal (necessário para abrir o menu principal)
export default function HomeScreen() {
    function trocaTela(id: number){
        switch(id){
            case 1:
                router.navigate('/(tabs)')
                break;
            case 2:
                router.navigate('/inicial')
                break;
            case 3:
                router.navigate('/inicial')
                break;
            case 4:
                router.navigate('/inicial')
                break;
        }
    }

  // O que será mostrado na tela
  return (
    <>
      <SafeAreaView style={styles.titleContainer}>
        <SafeAreaView style={{marginBottom: 75}}>
          <Text style={{fontSize: 30, fontWeight: "bold", textAlign: "center"}}>MENU PRINCIPAL</Text>
          <Image style={{width: 177, height: 162, resizeMode: 'contain', alignSelf: 'center', marginTop: '10%'}} source={require('../../assets/images/foto_tela_inicial.png')}></Image>
        </SafeAreaView>

        <SafeAreaView style={{bottom: '5%'}}>
            <SafeAreaView style={{flexDirection: 'row'}}>
                <Image style={{width: 33, resizeMode: 'contain', bottom: "7%"}} source={require('../../assets/images/menu.png')}></Image>
                <TouchableOpacity onPress={() => trocaTela(1)}><Text style={styles.input}>Cadastrar reação colorímetro</Text></TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={{flexDirection: 'row'}}>
                <Image style={{width: 33, resizeMode: 'contain', bottom: "7%"}} source={require('../../assets/images/menu.png')}></Image>
                <TouchableOpacity onPress={() => trocaTela(2)}><Text style={styles.input}>Visualize os dados do colorímetro</Text></TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={{flexDirection: 'row'}}>
                <Image style={{width: 33, resizeMode: 'contain', bottom: "7%"}} source={require('../../assets/images/menu.png')}></Image>
                <TouchableOpacity onPress={() => trocaTela(3)}><Text style={styles.input}>Visualize a possibilidade de reação</Text></TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={{flexDirection: 'row'}}>
                <Image style={{width: 33, resizeMode: 'contain', bottom: "7%"}} source={require('../../assets/images/menu.png')}></Image>
                <TouchableOpacity onPress={() => trocaTela(4)}><Text style={styles.input}>Visualize o modelo 3d do colorímetro</Text></TouchableOpacity>
            </SafeAreaView>            
        </SafeAreaView>
      </SafeAreaView>

      <SafeAreaView style={{position: 'absolute', bottom: 0, left: '10%', flexDirection: 'row'}}>
            <Image style={{width: 33, resizeMode: 'contain'}} source={require('../../assets/images/usuario.png')}></Image>
            <Text style={{borderWidth: 0.5, height: 32, fontWeight: 'bold', borderRadius: 10}}>Usuário: Matheus Tonini dos Santos</Text>
      </SafeAreaView>
    </>
  );
} 

// Estilos da página
const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    top: '5%',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    borderWidth: 0.5,
    margin: 5,
    padding: 6,
    fontWeight: 'bold',
    borderRadius: 10
  },
});
