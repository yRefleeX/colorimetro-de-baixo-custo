// Importando as bibliotecas necessárias para o código
import React, {useState} from 'react'
import { Platform, StyleSheet, SafeAreaView, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import {useForm, Controller} from 'react-hook-form';


// Chamando a função principal (necessário para abrir a tela inicial)
export default function HomeScreen() {
  const {control, handleSubmit, formState: {errors}} = useForm({})
  
  function handleSignIn(data: any){
    console.log(data)
  }


  // O que será mostrado na tela
  return (
    <SafeAreaView style={styles.titleContainer}>
      <SafeAreaView>
        <Image source={require('../../assets/images/foto_login.png')}></Image>
        <Text style={{fontSize: 30, fontWeight: "bold", textAlign: "center", marginBottom: '50%'}}>COEGI</Text>
      </SafeAreaView>

      <SafeAreaView>
        <Controller control={control} name="email" render={({field: {onChange, onBlur, value, }}) => (<TextInput style={styles.input} onChangeText={onChange} onBlur={onBlur} value={value} placeholder='Email'></TextInput>)}/>
        <Controller control={control} name="password" render={({field: {onChange, onBlur, value, }}) => (<TextInput style={styles.input} onChangeText={onChange} onBlur={onBlur} value={value} placeholder='Senha' secureTextEntry={true}></TextInput>)}/>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(handleSignIn)}><Text style={styles.buttonText}>Entrar</Text></TouchableOpacity>
      </SafeAreaView>
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
  stepContainer: {
    gap: 8,
    marginBottom: 8
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
  }
});
