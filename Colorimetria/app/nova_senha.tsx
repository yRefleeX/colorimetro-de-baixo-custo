import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from 'react-native';
import React, {useState, useEffect} from 'react';
import { TextInput } from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { router, useLocalSearchParams } from 'expo-router';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const { height } = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

const schema = yup.object({
    senha: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres.").required("Digite uma senha"),
    confirmarSenha: yup.string().oneOf([yup.ref('senha')], 'Senha tem que ser igual').required('Digite uma senha')
})

type FormData = yup.InferType<typeof schema>;

export default function NovaSenha() {
    const [loading, setLoading] = useState(false);
    const [actionCode, setActionCode] = useState<string | null>(null);
    const params = useLocalSearchParams();

    useEffect(() => {
        // O Expo Router passa o 'oobCode' (action code) do link como um parâmetro
        const code = params.oobCode as string;
        if (code) {
            // Verifica se o código é válido antes de mostrar o formulário
            verifyPasswordResetCode(auth, code)
                .then(() => {
                    setActionCode(code);
                })
                .catch((error) => {
                    console.error("Código de redefinição inválido:", error);
                    Alert.alert("Link Inválido", "Este link de redefinição de senha é inválido ou já expirou. Por favor, solicite um novo.");
                    router.replace('/');
                });
        } else {
             Alert.alert("Erro", "Nenhum código de redefinição encontrado.");
             router.replace('/');
        }
    }, [params]);

    
    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            senha: '',
            confirmarSenha: ''
        }
    })

    // Função para confirmar a nova senha
    const handleConfirmPassword = async (data: FormData) => {
        if (!actionCode) {
            Alert.alert("Erro", "Código de ação inválido.");
            return;
        }
        setLoading(true);
        try {
            await confirmPasswordReset(auth, actionCode, data.senha);
            Alert.alert(
                "Senha Redefinida!",
                "Sua senha foi alterada com sucesso. Você já pode fazer login."
            );
            router.replace('/'); // Volta para a tela de login
        } catch (error: any) {
            console.error("Erro ao redefinir senha:", error);
            Alert.alert("Erro", "Não foi possível redefinir a senha. O link pode ter expirado.");
        } finally {
            setLoading(false);
        }
    };

    if (!actionCode) {
        // Mostra um loader enquanto o código é verificado
        return (
            <SafeAreaView style={styles.titleContainer}>
                <ActivityIndicator size="large" />
                <Text>Verificando link...</Text>
            </SafeAreaView>
        );
    }

  return (
    <SafeAreaView style={styles.titleContainer}>
        <View style={styles.content}>
            <Text style ={{ fontSize:30, fontFamily:"Ruwudu", textAlign:'center', marginBottom: height * 0.08}}>Digite a sua nova senha</Text>

            <View style={{backgroundColor:"#e3e3e3", height:230, borderRadius:15, width:'100%', alignSelf:'center'}}>
                <Controller control={control} name='senha' render={({field: {onChange, onBlur, value, }}) => (<TextInput placeholder='Senha' secureTextEntry={true} style={{ height: 40, backgroundColor: 'white', borderRadius: 5, borderColor: errors.senha && 'red', borderWidth:1, alignSelf:'center', marginTop: 20}} onChangeText={onChange} onBlur={onBlur} value={value}></TextInput>)}/>{errors.senha && <Text style={{ color:'red', alignSelf:'center'}}>{errors.senha.message}</Text>}
                <Controller control={control} name='confirmarSenha' render={({field: {onChange, onBlur, value, }}) => (<TextInput placeholder='Confirmar Senha' secureTextEntry={true} style={{ height: 40, backgroundColor: 'white', borderRadius: 5, borderColor: errors.senha && 'red', borderWidth:1, alignSelf:'center', marginTop: 20}} onChangeText={onChange} onBlur={onBlur} value={value}></TextInput>)}/>{errors.confirmarSenha && <Text style={{ color:'red', alignSelf:'center'}}>{errors.confirmarSenha.message}</Text>}
                <TouchableOpacity style={styles.button} onPress={handleSubmit(handleConfirmPassword)} disabled={loading}>{loading ? <ActivityIndicator color="#4F378A" /> : <Text style={styles.buttonText}>Enviar</Text>}</TouchableOpacity>
            </View>
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
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
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
        fontWeight: 'bold',
        fontSize: 16
    }
});
