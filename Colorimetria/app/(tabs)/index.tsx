// Importando as bibliotecas necessárias para o código
import React from 'react';
import {router} from 'expo-router';
import {StyleSheet, SafeAreaView, Text, Image, TextInput, TouchableOpacity, Dimensions, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const { height } = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

// Declaração da constante 'schema', que será utilizada pela função yupResolver para verificar se o que o usuário digitou está correto
const schema = yup.object({
  email: yup.string().email("Digite um email válido!").required("Digite seu email."),
  password: yup.string().required("Digite sua senha.")
})

// Chamando a função principal (necessário para abrir a tela inicial)
export default function HomeScreen() {

  const {control, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema) // Utilização do yupResolver para validação os dados
  })
  
  // Função para entrar na tela inicial após o login
  function handleSignIn(data: any){
    console.log(data)
    router.navigate('/inicial')
  }


  // O que será mostrado na tela
  return (
      // Container do app (onde ficará toda a view)
      <SafeAreaView style={styles.titleContainer}>

        {/* Logo do IFSP, junto com o título (nome do app) */}
        <View>
          <Image source={require('../../assets/images/foto_login.png')}></Image>
          <Text style={{fontSize: 30, fontWeight: "bold", textAlign: "center", marginBottom: height * 0.08}}>COEGI</Text>
        </View>

        {/* View com inputs para login */}
        <View>
          <Controller control={control} name="email" render={({field: {onChange, onBlur, value, }}) => (<TextInput style={[styles.input, {borderColor: errors.email && 'red'}]} onChangeText={onChange} onBlur={onBlur} value={value} placeholder='Email'></TextInput>)}/>{errors.email && <Text style={styles.errorMessage}>{errors.email.message}</Text>}
          <Controller control={control} name="password" render={({field: {onChange, onBlur, value, }}) => (<TextInput style={[styles.input, {borderColor: errors.password && 'red'}]} onChangeText={onChange} onBlur={onBlur} value={value} placeholder='Senha' secureTextEntry={true}></TextInput>)}/>{errors.password && <Text style={styles.errorMessage}>{errors.password.message}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleSubmit(handleSignIn)}><Text style={styles.buttonText}>Entrar</Text></TouchableOpacity>
        </View>

        <TouchableOpacity style={{top: height * 0.1}}><Text style={{color: '#0000FF', fontWeight: 'bold'}}>Esqueceu a Senha?</Text></TouchableOpacity> {/* Botão para entrar no app */}
      </SafeAreaView>
  );
} 

// Estilos da página
const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    top: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  input: {
    borderWidth: 0.5,
    margin: 5,
    padding: 10
  },
  button: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#EADDFF',
  },
  buttonText: {
    color: '#4F378A',
    fontWeight: 'bold'
  },
  errorMessage: {
    color: 'red'
  }
});
