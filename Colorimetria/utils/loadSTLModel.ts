import { Asset } from 'expo-asset';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

export async function loadSTLModelAsync(assetModule: number): Promise<THREE.BufferGeometry> {
  const asset = Asset.fromModule(assetModule);
  await asset.downloadAsync();

  if (!asset.localUri) {
    throw new Error('Asset não disponível localmente.');
  }

  const response = await fetch(asset.localUri);
  const arrayBuffer = await response.arrayBuffer();

  const loader = new STLLoader();
  const geometry = loader.parse(arrayBuffer);

  return geometry;
}