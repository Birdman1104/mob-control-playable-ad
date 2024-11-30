import anime from "animejs";
import * as THREE from "three";
import { MODELS } from "../assets";
import TowerConfig from "../configs/TowerConfig";

export default class Tower extends THREE.Group {
  #tower; // Model;

  constructor() {
    super();

    this.#init();
  }

  shake() {
    anime.remove(this.#tower.scene.rotation);
    this.#tower.scene.rotation.set(0, 0, 0);
    anime({
      targets: this.#tower.scene.rotation,
      x: [0, 0.1, -0.1, 0],
      duration: 500,
      easing: "easeInOutSine",
    });
  }

  #init() {
    const { position, rotation, scale } = TowerConfig;

    this.#tower = MODELS["tower"];

    this.#tower.scene.position.set(position.x, position.y, position.z);
    this.#tower.scene.rotation.set(rotation.x, rotation.y, rotation.z);
    this.#tower.scene.scale.set(scale.x, scale.y, scale.z);

    this.add(this.#tower.scene);
  }
}

