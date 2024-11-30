import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import assets, { IMAGES, MODELS, SOUNDS } from "../assets";
import { callIfExists } from "../utils";

export default class Loader {
  #gltfLoader; // GLTFLoader
  #audioLoader; // THREE.AudioLoader
  #textureLoader; // THREE.TextureLoader
  #cb; // Function

  constructor(cb) {
    this.#cb = cb;

    this.#gltfLoader = new GLTFLoader();
    this.#audioLoader = new THREE.AudioLoader();
    this.#textureLoader = new THREE.TextureLoader();
  }

  load() {
    this.#loadModels(() => {
      this.#loadSounds(() => {
        this.#loadTextures(() => {
          callIfExists(this.#cb);
        });
      });
    });
  }

  #loadModels(cb) {
    const { models } = assets;
    const keys = Object.keys(assets.models);

    keys.forEach((model, i) => {
      this.#gltfLoader.load(models[model], (gltf) => {
        const modelName = model.split(".")[0];
        MODELS[modelName] = gltf;

        if (i === keys.length - 1) {
          callIfExists(cb);
        }
      });
    });
  }

  #loadSounds(cb) {
    const { sounds } = assets;
    const keys = Object.keys(sounds);

    keys.forEach((sound, i) => {
      this.#audioLoader.load(sounds[sound], (buffer) => {
        const soundName = sound.split(".")[0];
        SOUNDS[soundName] = buffer;

        if (i === keys.length - 1) {
          callIfExists(cb);
        }
      });
    });
  }

  #loadTextures(cb) {
    const { images } = assets;

    const keys = Object.keys(images);
    keys.forEach((image, i) => {
      this.#textureLoader.load(images[image], (texture) => {
        const imageName = image.split(".")[0];
        IMAGES[imageName] = texture;

        if (i === keys.length - 1) {
          callIfExists(cb);
        }
      });
    });
  }
}

