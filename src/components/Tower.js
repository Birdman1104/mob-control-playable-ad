import anime from "animejs";
import * as THREE from "three";
import { MODELS } from "../assets";

export default class Tower extends THREE.Group {
  #tower; // Model;

  constructor() {
    super();

    this.#init();
  }

  shake() {
    anime.remove(this.#tower.rotation);
    this.#tower.rotation.set(0, 0, 0);
    anime({
      targets: this.#tower.rotation,
      x: [0, 0.1, -0.1, 0],
      duration: 500,
      easing: "easeInOutSine",
    });
  }

  #init() {
    this.#tower = MODELS["tower"];

    this.add(this.#tower);
  }
}

