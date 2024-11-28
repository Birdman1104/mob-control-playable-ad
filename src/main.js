import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import assets, { IMAGES, MODELS, SOUNDS } from "./assets";
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

    this.#container.appendChild(this.#renderer.threeRenderer.domElement);
    this.#loadAssets();
  }

  #onAssetLoadingComplete() {
    this.#plane = new Plane();
    this.#cube = new Cube();
    this.#light = new Light();

    this.#scene.add(this.#plane.plane);
    this.#scene.add(this.#cube.cube);
    this.#light.addLights(this.#scene);

    this.#camera.camera.lookAt(this.#scene.position);

    this.#render();
    this.#setEvents();
  }

  #render() {
    this.#cube.animateCube();

    requestAnimationFrame(this.#render.bind(this));
    this.#renderer.render(this.#scene, this.#camera.camera);
  }

  #loadAssets() {
    this.#loadModels();
  }

  #loadTextures() {
    const { images } = assets;
    this.#textureLoader = new THREE.TextureLoader();

    const keys = Object.keys(images);
    keys.forEach((image, i) => {
      this.#textureLoader.load(images[image], (texture) => {
        const imageName = image.split(".")[0];
        IMAGES[imageName] = texture;

        if (i === keys.length - 1) {
          this.#onAssetLoadingComplete();
        }
      });
    });
  }

  #loadSounds() {
    const { sounds } = assets;
    const keys = Object.keys(sounds);
    const listener = new THREE.AudioListener();
    this.#camera.camera.add(listener);
    // const soundSource = new THREE.Audio(listener);
    this.#audioLoader = new THREE.AudioLoader();

    keys.forEach((sound, i) => {
      this.#audioLoader.load(sounds[sound], (buffer) => {
        const soundName = sound.split(".")[0];
        SOUNDS[soundName] = buffer;

        if (i === keys.length - 1) {
          this.#loadTextures();
        }
      });
    });
  }

  #loadModels() {
    const { models } = assets;
    const keys = Object.keys(assets.models);

    this.#gltfLoader = new GLTFLoader();

    keys.forEach((model, i) => {
      this.#gltfLoader.load(models[model], (gltf) => {
        const modelName = model.split(".")[0];
        MODELS[modelName] = gltf;

        if (i === keys.length - 1) {
          this.#loadSounds();
        }
      });
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

