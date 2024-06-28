import * as THREE from 'three';
import { GUI } from 'dat.gui';

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

// 큐브 생성
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 애니메이션 속도 설정
const rotationSpeed = { x: 0.01, y: 0.01 };

// GUI 설정
const gui = new GUI();
gui.add(rotationSpeed, 'x', 0, 0.1); // x축 회전 속도 조절
gui.add(rotationSpeed, 'y', 0, 0.1); // y축 회전 속도 조절

// 마우스 클릭 이벤트 리스너
document.addEventListener('click', () => {
  cube.material.color.set(Math.random() * 0xffffff); // 랜덤 색상 설정
});

// 애니메이션 함수
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += rotationSpeed.x; // 설정된 x축 회전 속도
  cube.rotation.y += rotationSpeed.y; // 설정된 y축 회전 속도
  renderer.render(scene, camera);
}

animate(); // 애니메이션 시작

// 창 크기 변경에 대응
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

