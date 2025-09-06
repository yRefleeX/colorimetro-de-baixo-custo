// Importando as bibliotecas necessárias para o código
import React, { useRef, useState } from 'react';
import {StyleSheet, View, SafeAreaView, Text, Dimensions, FlatList, ActivityIndicator, Platform, Alert} from 'react-native';
import UserInfoDisplay from '@/components/UserInfoDisplay';
import VoltaInicio from '@/components/VoltaInicio';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { Asset } from 'expo-asset';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { readAsStringAsync } from 'expo-file-system';


const { height, width } = Dimensions.get('window'); // Utilizando 'height' para fazer estilização responsiva, a partir da biblioteca Dimensions

// --- Componente do Visualizador 3D ---
const ModelViewer = () => {
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const modelRef = useRef<THREE.Mesh | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    // -- Lógica de Gestos com Reanimated --
    const rotationX = useSharedValue(0);
    const rotationY = useSharedValue(0);
    const savedRotationX = useSharedValue(0);
    const savedRotationY = useSharedValue(0);

    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            rotationX.value = savedRotationX.value + e.translationY * 0.01;
            rotationY.value = savedRotationY.value + e.translationX * 0.01;
        })
        .onEnd(() => {
            savedRotationX.value = rotationX.value;
            savedRotationY.value = rotationY.value;
        });

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            const newScale = savedScale.value * e.scale;
            scale.value = Math.max(0.2, Math.min(newScale, 3));
        })
        .onEnd(() => {
            savedScale.value = scale.value;
        });

    const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

    const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
        camera.position.z = 150;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ canvas: gl.canvas as any, antialias: true });
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
        renderer.setClearColor(0xf0f0f0);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 0.8);
        pointLight.position.set(100, 100, 100);
        scene.add(pointLight);

        try {
            const asset = Asset.fromModule(require('../assets/models/colorimetro.stl'));
            await asset.downloadAsync();

            console.log('Asset localUri:', asset.localUri);
            Alert.alert('Debug', `Asset localUri: ${asset.localUri}`);

            const loader = new STLLoader();

            const onModelLoaded = (geometry: THREE.BufferGeometry) => {
                geometry.center();
                const material = new THREE.MeshStandardMaterial({
                    color: 0x606060, metalness: 0.5, roughness: 0.5,
                });
                const model = new THREE.Mesh(geometry, material);
                model.scale.set(1.5, 1.5, 1.5);
                scene.add(model);
                modelRef.current = model;
            };

            if (Platform.OS === 'web') {
                loader.load(
                    asset.uri,
                    onModelLoaded,
                    undefined,
                    (error) => {
                        console.error("Erro ao carregar o modelo na web:", error);
                        Alert.alert("Erro Web", "Não foi possível carregar o modelo 3D.");
                        setIsLoading(false);
                    }
                );
            } else {
                if (asset.localUri) {
                const response = await fetch(asset.localUri);
                const arrayBuffer = await response.arrayBuffer();
                const geometry = loader.parse(arrayBuffer);
                onModelLoaded(geometry);
                } else {
                throw new Error("O asset não tem um localUri válido.");
                }
            }
            
        } catch (e) {
            console.error("ERRO CRÍTICO AO CARREGAR O MODELO 3D:", e);
            Alert.alert("Erro", "Não foi possível carregar o modelo 3D. Verifique a consola para detalhes.");
        } finally {
            setIsLoading(false);
        }
        
        const animate = () => {
            requestAnimationFrame(animate);
            if (modelRef.current) {
                modelRef.current.rotation.x = rotationX.value;
                modelRef.current.rotation.y = rotationY.value;
            }
            if (cameraRef.current) {
                cameraRef.current.zoom = scale.value;
                cameraRef.current.updateProjectionMatrix();
            }
            renderer.render(scene, camera);
            gl.endFrameEXP();
        };
        animate();
    };

    return (
        <GestureHandlerRootView style={styles.viewerContainer}>
            <GestureDetector gesture={composedGesture}>
                <View style={styles.viewerContainer}>
                    {isLoading && (
                        <View style={styles.loadingOverlay}>
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Text>A carregar modelo...</Text>
                        </View>
                    )}
                    <GLView
                        style={{ flex: 1 }}
                        onContextCreate={onContextCreate}
                    />
                </View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
};

// --- Componente Principal da Tela ---
export default function ViewColorimeterScreen() {
 return (
     <SafeAreaView style={styles.container}>
         <VoltaInicio></VoltaInicio>
         <View style={{marginBottom: height * 0.05, marginTop: height * 0.1}}>
           <Text style={{fontSize: 30, fontWeight: "bold", textAlign: "center"}}>Modelo 3D: Colorímetro</Text>
         </View>

         <ModelViewer/>

         <View style={{width: '80%', marginBottom: height * 0.1}}>
             <Text style={{marginBottom: 20, fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline', textAlign: 'center'}}>LISTA DE COMPONENTES UTILIZADOS:</Text>
             <FlatList
                 data={[
                 { key: '2 pilhas AA' },
                 { key: 'EC2 Macho + Fêmea' },
                 { key: 'Módulo Bluetooth Hc-05' },
                 { key: 'Kit Arduino Iniciante' },
                 { key: 'Plástico preto' },
                 { key: 'Cubeta em vidro óptico 2 faces polidas 7 mL' },
                 { key: 'LED branco 5 mm' },
                 { key: 'Suporte para 2 pilhas AA' },
                 { key: 'Sensor TCS3472' }
                 ]}
                 renderItem={({ item }) => {
                 return (
                     <View style={{marginBottom: 10}}>
                     <Text style={{ fontSize: 16, textAlign: 'center' }}>{`\u2022 ${item.key}`}</Text>
                     </View>
                 );
                 }}
             />
         </View>

         <UserInfoDisplay/>
     </SafeAreaView>
 );
} 

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  viewerContainer: {
      width: width,
      height: height * 0.35,
      backgroundColor: '#f0f0f0',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

