// Importando as bibliotecas necessárias para o código
import React, {useState, useEffect} from 'react';
import {router, Href} from 'expo-router';
import {StyleSheet, View, SafeAreaView, Text, Image, Dimensions, TouchableOpacity, Alert} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UserInfoDisplay from '@/components/UserInfoDisplay';
import {auth} from '../firebaseConfig';
import {User} from 'firebase/auth';

const { height } = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

// Chamando a função principal (necessário para abrir o menu principal)
export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const isGuest = user ? user.isAnonymous : false;

  useEffect(() => {
    // Escuta as mudanças de autenticação para saber quem é o usuário
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
        setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Função para trocar de tela
  const trocaTela = (path: Href, isProtected: boolean) => {
      if (isProtected && isGuest) {
          // Se a rota for protegida e o usuário for convidado, mostra um alerta
          Alert.alert(
              "Função Limitada",
              "Para acessar esta funcionalidade, por favor, crie uma conta."
          );
      } else {
          // Caso contrário, navega para a tela
          router.navigate(path);
      }
  };

  // O que será mostrado na tela
  return (
      // Container do app (onde ficará toda a view)
      <SafeAreaView style={styles.titleContainer}>
        {/* Título "MENU PRINCIPAL", junto com a logo da tela inicial */}
        <View style={{marginBottom: height * 0.05, marginTop: height * 0.1}}>
          <Text style={{fontSize: 30, fontWeight: "bold", textAlign: "center"}}>MENU PRINCIPAL</Text>
          <Image style={{width: 177, height: 162, resizeMode: 'contain', alignSelf: 'center', marginTop: '10%'}} source={require('../assets/images/foto_tela_inicial.png')}></Image>
        </View>

        {/* View para mostrar o menu com as opções */}
        <View style={{width: '80%', marginBottom: height * 0.1}}>
                <TouchableOpacity style={[styles.menuItem, isGuest && styles.disabledMenuItem]} onPress={() => trocaTela('/', true)}>
                  <MaterialCommunityIcons name={isGuest ? 'block-helper': 'magnify'} size={24} color={isGuest ? '#c53929' : 'gray'}></MaterialCommunityIcons>
                  <Text style={[styles.menuText, isGuest && styles.disabledMenuText]}>Cadastrar reação colorímetro</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.menuItem, isGuest && styles.disabledMenuItem]} onPress={() => trocaTela('/', true)}>
                  <MaterialCommunityIcons name={isGuest ? 'block-helper': 'magnify'} size={24} color={isGuest ? '#c53929' : 'gray'}></MaterialCommunityIcons>
                  <Text style={[styles.menuText, isGuest && styles.disabledMenuText]}>Visualize os dados do colorímetro</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.menuItem, isGuest && styles.disabledMenuItem]} onPress={() => trocaTela('/', true)}>
                  <MaterialCommunityIcons name={isGuest ? 'block-helper': 'magnify'} size={24} color={isGuest ? '#c53929' : 'gray'}></MaterialCommunityIcons>
                  <Text style={[styles.menuText, isGuest && styles.disabledMenuText]}>Visualize a possibilidade de reação</Text>
                </TouchableOpacity>

                {/* Botão público para todos os usuários */}
                <TouchableOpacity style={styles.menuItem} onPress={() => trocaTela('/modelo_3d', false)}>
                  <MaterialCommunityIcons name='magnify' size={24} color='gray'></MaterialCommunityIcons>
                  <Text style={styles.menuText}>Visualize o modelo 3d do colorímetro</Text>
                </TouchableOpacity>
        </View>

        <UserInfoDisplay/> {/* Seção com as informações do usuário, junto com o botão para sair do app */}
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
  },

  // Estilos para botões desabilitados
  disabledMenuItem: {
      backgroundColor: '#fce8e6',
      borderColor: '#f5c6c',
  },
  disabledMenuText: {
      color: '#a94442',
  }
});
