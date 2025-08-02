import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { height } = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

const schema = yup.object({
    email: yup.string().email("Digite um email válido").required("Digite um email"),
})

export default function Codigo() {

const {control, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
})

function handleSignIn(data: any){
    console.log(data)
    router.navigate('/nova_senha')
}
  return (
    <SafeAreaView style={styles.titleContainer}>
    
        <MaterialCommunityIcons name='account-question' size={175} color='black'></MaterialCommunityIcons>
        <Text style ={{ fontSize:30, fontFamily:"Ruwudu", textAlign:'center', marginBottom: height * 0.06}}>Digite o Email para o envio do código</Text>

        <View style={{backgroundColor:"#e3e3e3", height:160, borderRadius:15, width:300, alignSelf:'center'}}>
            <Controller control={control} name='email' render={({field: {onChange, onBlur, value, }}) => (<TextInput placeholder='Email' style={{ height: 40, backgroundColor: 'white', width: 150, borderRadius: 5, borderColor: errors.email && 'red', borderWidth:1, alignSelf:'center', marginTop: 20}} onChangeText={onChange} onBlur={onBlur} value={value}></TextInput>)}/>{errors.email && <Text style={{ color:'red', alignSelf:'center'}}>{errors.email.message}</Text>}
            <TouchableOpacity style={{height:40, width:80, backgroundColor:'white', alignSelf:'center', alignItems:'center', marginTop: height * 0.03}} onPress={handleSubmit(handleSignIn)}><text style={{marginTop:11}}><b>Enviar</b></text></TouchableOpacity>
            <TouchableOpacity style={styles.buttonVoltar} onPress={() => router.navigate('/')}><Text style={{color: '#555', fontSize: 16}}>Voltar</Text></TouchableOpacity>
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create ({
    titleContainer: {
        display: 'flex',
        top: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    },
    buttonVoltar: {
        marginTop: 15,
        alignItems: 'center'
    }
});
