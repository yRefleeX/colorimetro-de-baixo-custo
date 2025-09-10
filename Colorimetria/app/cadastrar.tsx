import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Dimensions, Alert, ActivityIndicator, TextInput } from 'react-native';
import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {auth} from '../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { router } from 'expo-router';

const { height } = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

const schema = yup.object({
    nome: yup.string().required("Digite um nome"),
    email: yup.string().email("Digite um email válido").required("Digite um email"),
    senha: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres.").required("Digite uma senha"),
    ConfirmarSenha: yup.string().oneOf([yup.ref('senha')], 'Senha tem que ser igual').required('Digite uma senha')
})

export default function Cadastrar() {
    const [loading, setLoading] = useState(false);

    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
        nome: '',
        email: '',
        senha: '',
        ConfirmarSenha: '',
        }
    })

    async function handleSignIn(data: any){
        if(!auth){
            Alert.alert("Erro", "Sistema de autenticação não inicializado.");
            return;
        }

        setLoading(true);
        try {
        // Cria o usuário com e-mail e senha
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.senha);
        const user = userCredential.user;

        // Adiciona o nome de exibição (opcional, mas recomendado para o cadastro)
        if (user) {
            await updateProfile(user, { displayName: data.nome });
        }

        console.log("Usuário cadastrado com sucesso:", user);
        Alert.alert("Sucesso", "Usuário cadastrado e logado com sucesso!");
        // Redireciona para a tela inicial após o cadastro
        router.replace('/inicial');

        } catch (error: any) {
        console.error("Erro ao cadastrar:", error.code, error.message);
        let errorMessage = 'Ocorreu um erro ao cadastrar. Tente novamente.';

        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'Este e-mail já está em uso. Por favor, use outro.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'O e-mail fornecido é inválido.';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'A senha é muito fraca. Tente uma mais forte.';
        }

        Alert.alert("Erro no Cadastro", errorMessage);
        } finally {
        setLoading(false);
        }
    }

  return (
    <SafeAreaView style={styles.container}>

    <View style={styles.content}>
        <Text style ={{ fontSize:30, fontWeight: 'bold', textAlign:'center'}}>CADASTRAR</Text>

            <View style={{ backgroundColor:"#e3e3e3", width: '100%', paddingVertical: 20, marginTop: height * 0.08, borderRadius:15, minHeight: 120}}>
                <Controller control={control} name='nome' render={({field: {onChange, onBlur, value, }}) => (<TextInput placeholder='Nome' style={[styles.input, {borderColor: errors.nome && 'red'}]} onChangeText={onChange} onBlur={onBlur} value={value}></TextInput>)}/>{errors.nome && <Text style={{ color:'red', alignSelf:'center'}}>{errors.nome.message}</Text>}
                <Controller control={control} name='email' render={({field: {onChange, onBlur, value, }}) => (<TextInput autoCapitalize='none' keyboardType='email-address' placeholder='Email' style={[styles.input, {borderColor: errors.email && 'red'}]} onChangeText={onChange} onBlur={onBlur} value={value}></TextInput>)}/>{errors.email && <Text style={{ color:'red', alignSelf:'center'}}>{errors.email.message}</Text>}
                <Controller control={control} name='senha' render={({field: {onChange, onBlur, value, }}) => (<TextInput placeholder='Senha' secureTextEntry={true} style={[styles.input, {borderColor: errors.senha && 'red'}]} onChangeText={onChange} onBlur={onBlur} value={value}></TextInput>)}/>{errors.senha && <Text style={{ color:'red', alignSelf:'center'}}>{errors.senha.message}</Text>}
                <Controller control={control} name='ConfirmarSenha' render={({field: {onChange, onBlur, value, }}) => (<TextInput placeholder='Confirmar Senha' secureTextEntry={true} style={[styles.input, {borderColor: errors.ConfirmarSenha && 'red'}]} onChangeText={onChange} onBlur={onBlur} value={value}></TextInput>)}/>{errors.ConfirmarSenha && <Text style={{ color:'red', alignSelf:'center'}}>{errors.ConfirmarSenha.message}</Text>}
                <TouchableOpacity style={styles.button} onPress={handleSubmit(handleSignIn)} disabled={loading}>{loading ? (<ActivityIndicator size="small" color="#000" />) : (<Text style={styles.buttonText}>Enviar</Text>)}</TouchableOpacity>
                <TouchableOpacity style={styles.buttonVoltar} onPress={() => router.navigate('/')} disabled={loading}><Text style={{color: '#555', fontSize: 16}}>Voltar</Text></TouchableOpacity>
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
    input: {
        borderWidth: 0.5,
        margin: 5,
        padding: 10,
        backgroundColor: 'white'
    },
    button: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EADDFF',
        marginTop: height * 0.01,
        flexDirection: 'row'
    },
    buttonText: {
        color: '#4F378A',
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonVoltar: {
        marginTop: 15,
        alignItems: 'center'
    }
});
