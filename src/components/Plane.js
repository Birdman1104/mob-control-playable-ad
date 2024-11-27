import * as THREE from "three";

export default class Plane {
  #plane; //

  constructor() {
    this.#plane = this.#initPlane();
  }

  get plane() {
    return this.#plane;
  }

  #initPlane() {
    const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    plane.receiveShadow = true;

    return plane;
  }
}

