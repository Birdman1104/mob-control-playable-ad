import * as THREE from "three";

export default class Light {
  #spotlight; // THREE.SpotLight
  #ambientLight; // THREE.AmbientLight

  constructor() {
    this.#spotlight = this.#initSpotlight();
    this.#ambientLight = this.#initAmbientLight();
  }

  addLights(scene) {
    scene.add(this.#spotlight);
    scene.add(this.#ambientLight);
  }

  #initSpotlight() {
    const spotLight = new THREE.SpotLight(0xffffff);

    spotLight.position.set(0, 0, 0);
    spotLight.castShadow = true;
    spotLight.debug = true;

    return spotLight;
  }

  #initAmbientLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff); // soft white light
    // this.#scene.add(light);

    return ambientLight;
  }
}

