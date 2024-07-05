import * as THREE from 'three';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader';

// 씬 생성
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// 카메라 생성
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

// 렌더러 생성
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 조명 설정
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// GLTF 로더 설정
const loader = new GLTFLoader();
loader.load('path/to/model.glb', (gltf) => {
  // 모델 최적화 예시: LOD 설정
  const lod = new THREE.LOD();
  lod.addLevel(gltf.scene, 0);
  scene.add(lod);
}, undefined, (error) => {
  console.error(error);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// 창 크기 변경에 대응
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

