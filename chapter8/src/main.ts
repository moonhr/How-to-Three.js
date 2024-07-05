import * as THREE from 'three';
import { World, Body, Box, Vec3, Material, ContactMaterial } from 'cannon-es';

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

// Cannon.js 설정
const world = new World();
world.gravity.set(0, -9.82, 0); // 중력 설정

// 바닥 생성
const groundMaterial = new Material('groundMaterial');
const groundShape = new Box(new Vec3(10, 0.1, 10));
const groundBody = new Body({ mass: 0, material: groundMaterial });
groundBody.addShape(groundShape);
groundBody.position.set(0, -1, 0);
world.addBody(groundBody);

// 바닥의 Three.js 메쉬 생성
const groundGeometry = new THREE.BoxGeometry(20, 0.2, 20);
const groundMeshMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const groundMesh = new THREE.Mesh(groundGeometry, groundMeshMaterial);
scene.add(groundMesh);

// 여러 개의 큐브 생성
const cubeMaterial = new Material('cubeMaterial');
const cubeMeshes: THREE.Mesh[] = [];
const cubeBodies: Body[] = [];

for (let i = 0; i < 5; i++) {
  const cubeShape = new Box(new Vec3(1, 1, 1));
  const cubeBody = new Body({ mass: 1, material: cubeMaterial });
  cubeBody.addShape(cubeShape);
  cubeBody.position.set(Math.random() * 4 - 2, 5 + i * 2, Math.random() * 4 - 2);
  world.addBody(cubeBody);

  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const cubeMeshMaterial = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff });
  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMeshMaterial);
  scene.add(cubeMesh);

  cubeMeshes.push(cubeMesh);
  cubeBodies.push(cubeBody);
}

// 물리 법칙 적용
const timeStep = 1 / 60;

function animate() {
  requestAnimationFrame(animate);

  // Cannon.js 세계 업데이트
  world.step(timeStep);

  // Three.js 메쉬 위치와 회전을 Cannon.js의 물리 시뮬레이션 결과에 맞춤
  for (let i = 0; i < cubeBodies.length; i++) {
    cubeMeshes[i].position.copy(cubeBodies[i].position as any);
    cubeMeshes[i].quaternion.copy(cubeBodies[i].quaternion as any);
  }

  renderer.render(scene, camera);
}

animate();

// 창 크기 변경에 대응
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

