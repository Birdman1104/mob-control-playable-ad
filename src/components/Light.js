import * as THREE from "three";

export default class Light {
  #ambientLight; // THREE.AmbientLight

  constructor() {
    this.#ambientLight = this.#initAmbientLight();
  }

  addLights(scene) {
    scene.add(this.#ambientLight);
  }

  #initAmbientLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    return ambientLight;
  }
}

