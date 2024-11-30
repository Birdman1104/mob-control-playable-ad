import * as THREE from "three";
import { MODELS } from "../assets";
import TowerConfig from "../configs/TowerConfig";

export default class Tower extends THREE.Group {
  #tower; // Model;

  constructor() {
    super();

    this.#init();
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

