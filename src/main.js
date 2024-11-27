import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import assets from "./assets";
import Camera from "./components/Camera";
import Cube from "./components/Cube";
import Light from "./components/Light";
import Plane from "./components/Plane";
import Renderer from "./components/Renderer";
export class Main {
  #gltfLoader; // GLTFLoader
  #audioLoader; // THREE.AudioLoader
  #textureLoader; // THREE.TextureLoader

  #scene; // THREE.Scene
  #container; // HTMLDivElement
  #renderer; // Renderer
  #camera; // Camera
  #plane; // Plane
  #cube; // Cube
  #light; // Light

  constructor(container) {
    this.#scene = new THREE.Scene();
    this.#container = container;

    this.#renderer = new Renderer(this.#scene, this.#container);
    this.#camera = new Camera(this.#renderer.threeRenderer);
    this.#plane = new Plane();
    this.#cube = new Cube();
    this.#light = new Light();

    this.#scene.add(this.#plane.plane);
    this.#scene.add(this.#cube.cube);
    this.#light.addLights(this.#scene);

    this.#camera.camera.lookAt(this.#scene.position);

    this.#container.appendChild(this.#renderer.threeRenderer.domElement);
    this.#loadAssets();

    this.#render();

    this.#setEvents();
  }

  #render() {
    this.#cube.animateCube();

    requestAnimationFrame(this.#render.bind(this));

    this.#renderer.render(this.#scene, this.#camera.camera);
  }

  #loadAssets() {
    this.#gltfLoader = new GLTFLoader();

    const { models, sounds, images } = assets;
    this.#loadModels(models);
    this.#loadSounds(sounds);
    this.#loadTextures(images);
  }

  #loadTextures(images) {
    this.#textureLoader = new THREE.TextureLoader();
    Object.keys(images).forEach((image) => this.#loadTexture(images[image]));
  }

  #loadTexture(texture) {
    const material = new THREE.MeshBasicMaterial({ map: this.#textureLoader.load(texture) });
    const geometry = new THREE.BoxGeometry();
    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = 8;
    cube.position.x = Math.random() * 20;
    this.#scene.add(cube);
  }

  #loadSounds(sounds) {
    const listener = new THREE.AudioListener();
    this.#camera.camera.add(listener);
    const soundSource = new THREE.Audio(listener);
    this.#audioLoader = new THREE.AudioLoader();
    Object.keys(sounds).forEach((sound) => this.#loadSound(sounds[sound], soundSource));
  }

  #loadModels(models) {
    Object.keys(models).forEach((model) => this.#loadModel(models[model]));
  }

  #loadModel(model) {
    this.#gltfLoader.load(model, (gltf) => {
      gltf.scene.position.set(Math.random() * 20, 5, Math.random() * 20);
      gltf.scene.scale.set(3, 3, 3);
      this.#scene.add(gltf.scene);
    });
  }

  #loadSound(sound) {
    this.#audioLoader.load(sound, (buffer) => {
      soundSource.setBuffer(buffer);
      soundSource.setLoop(false);
      soundSource.play();
    });
  }

  #setEvents() {
    window.addEventListener("resize", () => {
      const { cameraWidth } = this.#camera.camera;
      const newAspectRatio = this.#container.offsetWidth / this.#container.offsetHeight;
      const adjustedCameraHeight = cameraWidth / newAspectRatio;

      this.#camera.camera.top = adjustedCameraHeight / 2;
      this.#camera.camera.bottom = adjustedCameraHeight / -2;
      this.#camera.camera.updateProjectionMatrix();

      this.#renderer.updateSize();
      this.#renderer.threeRenderer.render(this.#scene, this.#camera.camera);
    });
  }
}

