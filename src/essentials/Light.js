import * as THREE from "three";

export default class Light {
  #ambientLight; // THREE.AmbientLight
  #scene;

  constructor(scene) {
    this.#scene = scene;
    this.#ambientLight = this.#initAmbientLight();
    this.#scene.add(this.#ambientLight);
  }

  #initAmbientLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    return ambientLight;
  }
}

