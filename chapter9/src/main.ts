import * as THREE from 'three';
import { VRButton } from '../node_modules/three/examples/jsm/webxr/VRButton';
import { ARButton } from '../node_modules/three/examples/jsm/webxr/ARButton.js';

// 씬 생성
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// 카메라 생성
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

// 렌더러 생성
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// AR/VR 버튼 추가
document.body.appendChild(VRButton.createButton(renderer));
document.body.appendChild(ARButton.createButton(renderer));

// 조명 설정
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// 큐브 생성
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 애니메이션 함수
function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// AR/VR 세션 시작
renderer.setAnimationLoop(animate);

// 창 크기 변경에 대응
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

