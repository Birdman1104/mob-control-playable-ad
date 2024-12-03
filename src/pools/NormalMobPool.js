import Mob from "../components/Mob";
import { MobsConfig } from "../configs/mobsConfig";

const N = 20;

export default class NormalMobPool {
  #scene;
  #mobs;

  constructor(scene) {
    this.#scene = scene;
    this.#mobs = [];

    for (let i = 0; i < N; i++) {
      this.#mobs.push(this.#addMob());
    }
  }

  getMob(position) {
    const mob = this.#mobs.find((mob) => !mob.isBorrowed) || this.#addMob();
    mob.updatePosition(position, { x: 0, y: 0, z: 0, w: 1 });

    if (!this.#mobs.includes(mob)) {
      this.#mobs.push(mob);
    }

    mob.activate(position);

    return mob;
  }

  returnMob(mob) {
    mob.health = MobsConfig.NormalMob.health;

    mob.deactivate();
  }

  #addMob() {
    const { health, attackDelay, speed } = MobsConfig.NormalMob;
    const mob = new Mob(this.#scene, "mob", health, attackDelay, speed);
    this.#scene.add(mob);

    return mob;

    // mixer = new THREE.AnimationMixer(mesh.scene)
    // const action = mixer.clipAction(mesh.animations[0])
    // action.play()
  }
}

