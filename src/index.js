import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const loader = new GLTFLoader();
// loader.load(model, (gltf) => scene.add(gltf.scene));

// const textureLoader = new THREE.TextureLoader();
// const material = new THREE.MeshBasicMaterial({ map: textureLoader.load(texture) });
// const geometry = new THREE.BoxGeometry();
// const cube = new THREE.Mesh(geometry, material);
// cube.position.y = -1;
// scene.add(cube);

const listener = new THREE.AudioListener();
camera.add(listener);
// const soundSource = new THREE.Audio(listener);
// const audioLoader = new THREE.AudioLoader();
// audioLoader.load(sound, (buffer) => {
//   soundSource.setBuffer(buffer);
//   soundSource.setLoop(false);
//   soundSource.play();
// });

camera.position.z = 1;
// const animate = () => {
//   requestAnimationFrame(animate);
//   cube.rotation.x += 0.02;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// };

// animate();

