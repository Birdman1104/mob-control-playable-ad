import * as THREE from "three";
import { CameraConfig } from "../configs/cameraConfig";

export default class Camera {
  #threeCamera; // THREE.PerspectiveCamera

  constructor(renderer) {
    this.#threeCamera = this.#getCamera(renderer);
    this.resize(renderer);
  }

  get camera() {
    return this.#threeCamera;
  }

  resize(renderer, h) {
    this.camera.top = h / 2;
    this.camera.bottom = h / -2;
    const { width, height } = renderer.domElement;
    this.#threeCamera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  #getCamera(renderer) {
    const { width, height } = renderer.domElement;
    const { fov, near, far, posX, posY, posZ } = CameraConfig;

    const camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
    camera.position.set(posX, posY, posZ);
    return camera;
  }
}

