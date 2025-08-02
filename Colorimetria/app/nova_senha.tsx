import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';

const { height } = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

const schema = yup.object({
    senha: yup.string().required("Digite uma senha"),
    ConfirmarSenha: yup.string().oneOf([yup.ref('senha')], 'Senha tem que ser igual').required('Digite uma senha')
})

export default function NovaSenha() {

const {control, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
})

function handleSignIn(data: any){
    console.log(data)
}
  return (
    <SafeAreaView style={styles.titleContainer}>
    
        <Text style ={{ fontSize:30, fontFamily:"Ruwudu", textAlign:'center', marginBottom: height * 0.08}}>Digite a sua nova senha</Text>

        <View style={{backgroundColor:"#e3e3e3", height:230, borderRadius:15, width:300, alignSelf:'center'}}>
            <Controller control={control} name='senha' render={({field: {onChange, onBlur, value, }}) => (<TextInput placeholder='Senha' secureTextEntry={true} style={{ height: 40, backgroundColor: 'white', width: 150, borderRadius: 5, borderColor: errors.senha && 'red', borderWidth:1, alignSelf:'center', marginTop: 20}} onChangeText={onChange} onBlur={onBlur} value={value}></TextInput>)}/>{errors.senha && <Text style={{ color:'red', alignSelf:'center'}}>{errors.senha.message}</Text>}
            <Controller control={control} name='ConfirmarSenha' render={({field: {onChange, onBlur, value, }}) => (<TextInput placeholder='Confirmar Senha' secureTextEntry={true} style={{ height: 40, backgroundColor: 'white', width: 150, borderRadius: 5, borderColor: errors.senha && 'red', borderWidth:1, alignSelf:'center', marginTop: 20}} onChangeText={onChange} onBlur={onBlur} value={value}></TextInput>)}/>{errors.ConfirmarSenha && <Text style={{ color:'red', alignSelf:'center'}}>{errors.ConfirmarSenha.message}</Text>}
            <TouchableOpacity style={{height:40, width:80, backgroundColor:'white', marginTop: height * 0.03, alignSelf:'center', alignItems:'center'}} onPress={handleSubmit(handleSignIn)}><text style={{marginTop:11}}><b>Enviar</b></text></TouchableOpacity>
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
});
