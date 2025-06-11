import { StyleSheet, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import { TextInput } from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';

const schema = yup.object({
    email: yup.string().email("Digite um email válido").required("Digite um email"),
    senha: yup.string().required("Digite uma senha"),
    ConfirmarSenha: yup.string().oneOf([yup.ref('senha')], 'Senha tem que ser igual').required('Digite uma senha')
})

export default function Cadastrar() {

const {control, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
})

function handleSignIn(data: any){
    console.log(data)
}

  return (
    <SafeAreaView>

    <Text style ={{ fontSize:30, fontFamily:"Ruwudu", textAlign:'center', marginTop:150}}>CADASTRAR</Text>

        <SafeAreaView style={{backgroundColor:"#e3e3e3", height:280, marginTop:120, borderRadius:15, width:300, alignSelf:'center'}}>
            <Controller control={control} name='email' render={({field: {onChange, onBlur, value, }}) => (<TextInput placeholder='Email' style={{ height: 40, backgroundColor: 'white', width: 150, borderRadius: 5, borderColor: errors.email && 'red', borderWidth:1, alignSelf:'center', marginTop: 20}} onChangeText={onChange} onBlur={onBlur} value={value}></TextInput>)}/>{errors.email && <Text style={{ color:'red', alignSelf:'center'}}>{errors.email.message}</Text>}
            <Controller control={control} name='senha' render={({field: {onChange, onBlur, value, }}) => (<TextInput placeholder='Senha' secureTextEntry={true} style={{ height: 40, backgroundColor: 'white', width: 150, borderRadius: 5, borderColor: errors.senha && 'red', borderWidth:1, alignSelf:'center', marginTop: 20}} onChangeText={onChange} onBlur={onBlur} value={value}></TextInput>)}/>{errors.senha && <Text style={{ color:'red', alignSelf:'center'}}>{errors.senha.message}</Text>}
            <Controller control={control} name='ConfirmarSenha' render={({field: {onChange, onBlur, value, }}) => (<TextInput placeholder='Confirmar Senha' secureTextEntry={true} style={{ height: 40, backgroundColor: 'white', width: 150, borderRadius: 5, borderColor: errors.senha && 'red', borderWidth:1, alignSelf:'center', marginTop: 20}} onChangeText={onChange} onBlur={onBlur} value={value}></TextInput>)}/>{errors.ConfirmarSenha && <Text style={{ color:'red', alignSelf:'center'}}>{errors.ConfirmarSenha.message}</Text>}
            <TouchableOpacity style={{height:40, width:80, backgroundColor:'white', marginTop:30, alignSelf:'center', alignItems:'center', marginBottom:15}} onPress={handleSubmit(handleSignIn)}><text style={{marginTop:11}}><b>Enviar</b></text></TouchableOpacity>
        </SafeAreaView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create ({
    
});
