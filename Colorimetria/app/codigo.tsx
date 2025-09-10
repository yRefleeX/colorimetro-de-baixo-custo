import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Dimensions, Alert , TextInput, ActivityIndicator } from 'react-native';
import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { sendPasswordResetEmail } from 'firebase/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { auth } from '../firebaseConfig';

const { height } = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

const schema = yup.object({
    email: yup.string().email("Digite um email válido").required("Digite um email"),
})

export default function Codigo() {
    const [loading, setLoading] = useState(false);

    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: ''
        }
    })

    const handlePasswordReset = async (data: {email: string}) => {
        setLoading(true);
        
        try {
            await sendPasswordResetEmail(auth, data.email);
            Alert.alert(
                "Verifique seu Email",
                `Um link para redefinir sua senha foi enviado para ${data.email}.`
            );
            router.back(); // Volta para a tela de login após o envio
        } catch (error: any) {
            console.error("Erro ao enviar email de redefinição:", error.code);
            let errorMessage = "Ocorreu um erro. Tente novamente.";
            if (error.code === 'auth/user-not-found') {
                errorMessage = "Nenhuma conta encontrada com este email.";
            }
            Alert.alert("Erro", errorMessage);
        } finally {
            setLoading(false);
        }
    };
  return (
    <SafeAreaView style={styles.container}>
    
        <View style={styles.content}>
            <MaterialCommunityIcons name='account-question' size={175} color='black'></MaterialCommunityIcons>
            <Text style ={{ fontSize:30, fontWeight: 'bold', textAlign:'center', marginBottom: height * 0.06}}>Digite seu e-mail para receber um link de redefinição</Text>

            <View style={{backgroundColor:"#e3e3e3", height:160, borderRadius:15, width:300, alignSelf:'center'}}>
                <Controller control={control} name='email' render={({field: {onChange, onBlur, value, }}) => (<TextInput placeholder='Email' style={{ height: 40, backgroundColor: 'white', width: 150, borderRadius: 5, borderColor: errors.email && 'red', borderWidth:1, alignSelf:'center', marginTop: 20}} onChangeText={onChange} onBlur={onBlur} value={value}></TextInput>)}/>{errors.email && <Text style={{ color:'red', alignSelf:'center'}}>{errors.email.message}</Text>}
                <TouchableOpacity style={{height:40, width:80, backgroundColor:'white', alignSelf:'center', alignItems:'center', marginTop: height * 0.03}} onPress={handleSubmit(handlePasswordReset)} disabled={loading}>{loading ? <ActivityIndicator color='#000'/> : <Text style={{marginTop:11, fontWeight: 'bold'}}>Enviar</Text>}</TouchableOpacity>
                <TouchableOpacity style={styles.buttonVoltar} onPress={() => router.navigate('/')}><Text style={{color: '#555', fontSize: 16}}>Voltar</Text></TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create ({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    buttonVoltar: {
        marginTop: 15,
        alignItems: 'center'
    }
});
