import * as THREE from "three";

const rotationSpeed = 0.015;

export default class Cube {
  #cube; // THREE.Mesh

  constructor() {
    this.#cube = this.#initCube();
  }

  get cube() {
    return this.#cube;
  }

  animateCube() {
    this.#cube.rotation.x += rotationSpeed;
    this.#cube.rotation.y += rotationSpeed;
    this.#cube.rotation.z += rotationSpeed;
  }

  #initCube() {
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.castShadow = true;
    cube.position.set(-4, 3, 0);

    return cube;
  }
}

