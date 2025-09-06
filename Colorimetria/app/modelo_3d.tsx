// Importando as bibliotecas necessárias para o código
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Dimensions, FlatList, ActivityIndicator, Platform, Alert } from 'react-native';
import UserInfoDisplay from '@/components/UserInfoDisplay';
import VoltaInicio from '@/components/VoltaInicio';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import * as THREE from 'three';
import { Renderer } from 'expo-three';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { loadSTLModelAsync } from '@/utils/loadSTLModel';

const { height, width } = Dimensions.get('window');

// --- Componente do Visualizador 3D ---
const ModelViewer = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Rotação e zoom via reanimated shared values
  const rotationX = useSharedValue(0);
  const rotationY = useSharedValue(0);
  const savedRotationX = useSharedValue(0);
  const savedRotationY = useSharedValue(0);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  // Pan gesture para rotacionar
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      rotationX.value = savedRotationX.value + e.translationY * 0.01;
      rotationY.value = savedRotationY.value + e.translationX * 0.01;
    })
    .onEnd(() => {
      savedRotationX.value = rotationX.value;
      savedRotationY.value = rotationY.value;
    });

  // Pinch gesture para zoom
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      const newScale = savedScale.value * e.scale;
      scale.value = Math.min(Math.max(newScale, 0.2), 3);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  async function onContextCreate(gl: any) {
    const { drawingBufferWidth: w, drawingBufferHeight: h } = gl;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 150;

    const renderer = new Renderer({ gl });
    renderer.setSize(w, h);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(100, 100, 100);
    scene.add(pointLight);

    let model: THREE.Mesh | null = null;

    try {
      const geometry = await loadSTLModelAsync(require('../assets/models/colorimetro.stl'));

      geometry.center();

      const material = new THREE.MeshStandardMaterial({
        color: 0x606060,
        metalness: 0.5,
        roughness: 0.5,
      });

      model = new THREE.Mesh(geometry, material);
      model.scale.set(1.5, 1.5, 1.5);
      scene.add(model);
    } catch (error) {
      console.error('Erro ao carregar STL:', error);
      Alert.alert('Erro', 'Não foi possível carregar o modelo 3D.');
    } finally {
      setIsLoading(false);
    }

    const animate = () => {
      requestAnimationFrame(animate);

      if (model) {
        model.rotation.x = rotationX.value;
        model.rotation.y = rotationY.value;
      }

      camera.zoom = scale.value;
      camera.updateProjectionMatrix();

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    animate();
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={composedGesture}>
        <GLView style={styles.glView} onContextCreate={onContextCreate} />
      </GestureDetector>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>A carregar modelo...</Text>
        </View>
      )}
    </GestureHandlerRootView>
  );
}

// --- Componente Principal da Tela ---
export default function ViewColorimeterScreen() {
 return (
     <SafeAreaView style={styles.container}>
         <VoltaInicio></VoltaInicio>
         <View style={{marginBottom: height * 0.05, marginTop: height * 0.1}}>
           <Text style={{fontSize: 30, fontWeight: "bold", textAlign: "center"}}>Modelo 3D: Colorímetro</Text>
         </View>

         <ModelViewer/>

         <View style={{width: '80%', marginBottom: height * 0.1, flex: 1}}>
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
    position: 'absolute',
    top: 0,
    left: 0,
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
    glView: {
    flex: 1,
  }
});