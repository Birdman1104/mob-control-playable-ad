import * as THREE from "three";
import { MODELS } from "../assets";
import Mob from "./Mob";

export default class NormalMob extends Mob {
  #mesh;
  #mixer;

  constructor() {
    super();

    this.hp = 100;

    this.#init();
  }

  update(dt) {
    this.#mixer?.update(dt);
  }

  attack() {
    super.attack();
  }

  #init() {
    this.#mesh = MODELS["mob"];

    const material = new THREE.MeshStandardMaterial({ color: 0x049ef4 });
    this.#mesh.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
    this.add(this.#mesh.scene);
  }

  #playAnimation() {
    this.#mixer = new THREE.AnimationMixer(this.#mesh.scene);
    const animations = this.#mesh.animations;
    setTimeout(() => {
      animations.forEach((clip) => {
        const action = this.#mixer.clipAction(clip);
        action.setEffectiveTimeScale(0.1);
        console.warn(action.timeScale);
        action.play();
      });
    }, 10);
  }
}

