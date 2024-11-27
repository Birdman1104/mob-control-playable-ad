import * as THREE from "three";
import { CameraConfig } from "../configs/cameraConfig";

export default class Camera {
  #threeCamera; // THREE.PerspectiveCamera

  constructor(renderer) {
    this.#threeCamera = this.#getCamera(renderer);
    this.#updateSize(renderer);

    window.addEventListener("resize", this.#updateSize.bind(this, renderer), false);
  }

  get camera() {
    return this.#threeCamera;
  }

  #getCamera(renderer) {
    const { width, height } = renderer.domElement;
    const { fov, near, far, posX, posY, posZ } = CameraConfig;

    const camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
    camera.position.set(posX, posY, posZ);
    return camera;
  }

  #updateSize(renderer) {
    const { width, height } = renderer.domElement;
    this.#threeCamera.aspect = width / height;
    this.#threeCamera.updateProjectionMatrix();
  }
}

