import * as THREE from "three";

export default class Renderer {
  #container; // HTMLElement

  constructor(container) {
    this.#container = container;
    this.threeRenderer = this.#initRenderer();
    this.#container.appendChild(this.threeRenderer.domElement);
  }

  updateSize() {
    this.threeRenderer.setSize(this.#container.offsetWidth, this.#container.offsetHeight);
  }

  render(scene, camera) {
    this.threeRenderer.render(scene, camera);
  }

  #initRenderer() {
    const threeRenderer = new THREE.WebGLRenderer();

    threeRenderer.setClearColor(0xeeeeee, 1.0);
    threeRenderer.setSize(innerWidth, innerHeight);

    threeRenderer.shadowMap.enabled = true;

    return threeRenderer;
  }
}

