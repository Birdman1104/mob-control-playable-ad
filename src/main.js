import * as THREE from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import assets, { IMAGES, MODELS, SOUNDS } from "./assets";
import Camera from "./components/Camera";
import Cube from "./components/Cube";
import Ground from "./components/Ground";
import Light from "./components/Light";
import Plane from "./components/Plane";
import Renderer from "./components/Renderer";
import { fitDimension } from "./utils";

export class Main {
  #gltfLoader; // GLTFLoader
  #audioLoader; // THREE.AudioLoader
  #textureLoader; // THREE.TextureLoader

  #scene; // THREE.Scene
  #container; // HTMLDivElement
  #renderer; // Renderer
  #camera; // Camera
  #plane; // Plane
  #ground; // Ground
  #cube; // Cube
  #light; // Light

  #canvas; // HTMLCanvasElement

  constructor(container) {
    this.#scene = new THREE.Scene();
    this.#container = container;

    this.#renderer = new Renderer(this.#container);
    this.#camera = new Camera(this.#renderer.threeRenderer);

    this.#container.appendChild(this.#renderer.threeRenderer.domElement);
    this.#loadAssets();
  }

  #onAssetLoadingComplete() {
    this.#plane = new Plane();
    this.#cube = new Cube();
    this.#light = new Light();
    this.#ground = new Ground();

    this.#ground.position.y = -1.5;

    this.#scene.add(this.#ground);
    this.#scene.add(this.#plane);
    this.#scene.add(this.#cube.cube);
    this.#light.addLights(this.#scene);

    this.#camera.camera.lookAt(this.#scene.position);

    this.#canvas = document.getElementById("container");
    const controls = new OrbitControls(this.#camera.camera, this.#canvas);
    controls.enableDamping = true;
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
      const { width: w, height: h } = fitDimension();
      this.#resizeCanvas(w, h);

      this.#camera.camera.top = h / 2;
      this.#camera.camera.bottom = h / -2;
      this.#camera.camera.updateProjectionMatrix();

      this.#renderer.updateSize();
      this.#renderer.threeRenderer.render(this.#scene, this.#camera.camera);
    });
  }

  #resizeCanvas(width, height) {
    if (!this.#canvas) return;
    const { style } = this.#canvas;
    style.width = `${width}px`;
    style.height = `${height}px`;
  }
}

