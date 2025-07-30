// Importando as bibliotecas necessárias para o código
import React from 'react';
import {router} from 'expo-router';
import {StyleSheet, View, SafeAreaView, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UserInfoDisplay from '@/components/UserInfoDisplay';

const { height } = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

// Chamando a função principal (necessário para abrir o menu principal)
export default function HomeScreen() {
    // Função para trocar de tela
    function trocaTela(id: number){
        switch(id){
            case 1:
                router.navigate('/(tabs)')
                break;
            case 2:
                router.navigate('/(tabs)')
                break;
            case 3:
                router.navigate('/(tabs)')
                break;
            case 4:
                router.navigate('/modelo_3d')
                break;
        }
    }

  // O que será mostrado na tela
  return (
      // Container do app (onde ficará toda a view)
      <SafeAreaView style={styles.titleContainer}>
        {/* Título "MENU PRINCIPAL", junto com a logo da tela inicial */}
        <View style={{marginBottom: height * 0.05, marginTop: height * 0.1}}>
          <Text style={{fontSize: 30, fontWeight: "bold", textAlign: "center"}}>MENU PRINCIPAL</Text>
          <Image style={{width: 177, height: 162, resizeMode: 'contain', alignSelf: 'center', marginTop: '10%'}} source={require('../../assets/images/foto_tela_inicial.png')}></Image>
        </View>

        {/* View para mostrar o menu com as opções */}
        <View style={{width: '80%', marginBottom: height * 0.1}}>
                <TouchableOpacity style={styles.menuItem} onPress={() => trocaTela(1)}>
                  <MaterialCommunityIcons name='magnify' size={24} color='gray'></MaterialCommunityIcons>
                  <Text style={styles.menuText}>Cadastrar reação colorímetro</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.menuItem} onPress={() => trocaTela(2)}>
                  <MaterialCommunityIcons name='magnify' size={24} color='gray'></MaterialCommunityIcons>
                  <Text style={styles.menuText}>Visualize os dados do colorímetro</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.menuItem} onPress={() => trocaTela(3)}>
                  <MaterialCommunityIcons name='magnify' size={24} color='gray'></MaterialCommunityIcons>
                  <Text style={styles.menuText}>Visualize a possibilidade de reação</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => trocaTela(4)}>
                  <MaterialCommunityIcons name='magnify' size={24} color='gray'></MaterialCommunityIcons>
                  <Text style={styles.menuText}>Visualize o modelo 3d do colorímetro</Text>
                </TouchableOpacity>
        </View>

        <UserInfoDisplay userName='Matheus Tonini dos Santos'></UserInfoDisplay> {/* Seção com as informações do usuário, junto com o botão para sair do app */}
      </SafeAreaView>
  );
} 

// Estilos da página
const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'gray'
  }
});
