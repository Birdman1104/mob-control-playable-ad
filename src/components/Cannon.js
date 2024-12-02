import * as THREE from "three";
import { MODELS } from "../assets";

export default class Cannon extends THREE.Group {
  #mixer;
  #clips;

  #cart;
  #trunk;

  constructor() {
    super();

    this.#init();
  }

  update(dt) {
    // this.#mixer?.setTime(dt);
  }

  #init() {
    this.#initBase();
    this.#initTrunk();
  }

  #initBase() {
    this.#cart = MODELS["cannon-cart"];
    this.add(this.#cart);
  }

  #initTrunk() {
    this.#trunk = MODELS["cannon-trunk"];
    this.#trunk.position.set(0, 0.65, 0);

    this.add(this.#trunk);

    this.#playAnimation();
  }

  #playAnimation() {
    // const model = this.#trunk.scene;
    // const animations = this.#trunk.animations;
    // this.#mixer = new THREE.AnimationMixer(model);
    // const action = this.#mixer.clipAction(animations[0]);
    // action.setLoop(THREE.LoopOnce);
    // action.enabled = true;
    // action.halt(1);
    // console.warn(action.setLoop);
    // action.play();
    // console.warn(action);
    // setInterval(() => {
    //   console.warn(action);
    //   console.log("loop");
    //   // action.play();
    // }, 2000);
    // const action = this.#mixer.clipAction(this.#trunk.animations[0]);
    // "gun|gun|gun|gun|shot|gun|shot"
  }
}

