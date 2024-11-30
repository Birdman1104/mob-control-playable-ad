import * as THREE from "three";
import { MODELS } from "../assets";

export default class Cannon extends THREE.Group {
  #cart;
  #trunk;

  constructor() {
    super();

    this.#init();
  }

  #init() {
    this.#initBase();
    this.#initTrunk();
  }

  #initBase() {
    this.#cart = MODELS["cannon-cart"];
    this.add(this.#cart.scene);
  }

  #initTrunk() {
    this.#trunk = MODELS["cannon-trunk"];
    this.#trunk.scene.position.set(0, 0.65, 0);
    console.warn(this.#cart);

    this.add(this.#trunk.scene);
  }
}

