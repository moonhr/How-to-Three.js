import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';

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
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  varying vec2 vUv;
  void main() {
    vec2 uv = vUv;
    uv.y += sin(uv.x * 10.0 + time) * 0.1;
    gl_FragColor = vec4(uv, 0.5 + 0.5 * sin(time), 1.0);
  }
`;

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    time: { value: 1.0 },
  },
});

const geometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 조명 설정
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// EffectComposer 설정
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// GlitchPass 추가
const glitchPass = new GlitchPass();
composer.addPass(glitchPass);

// 애니메이션 함수
function animate() {
  requestAnimationFrame(animate);
  cube.material.uniforms.time.value += 0.05; // 시간 업데이트
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  composer.render(); // EffectComposer를 사용하여 렌더링
}

animate(); // 애니메이션 시작

// 창 크기 변경에 대응
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

