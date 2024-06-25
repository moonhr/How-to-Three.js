import * as THREE from 'three';

// 씬 생성
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// 카메라 생성
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5);

// 렌더러 생성
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 큐브 생성
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 환경광 추가
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// 포인트 광원 추가
const pointLight = new THREE.PointLight(0xffffff, 1000);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// 애니메이션 루프
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

// 창 크기 변경에 대응
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

