import NormalMobPool from "../pools/NormalMobPool";

export class Player {
  #scene;
  #pool;
  #mobs;

  constructor(scene) {
    this.#scene = scene;
    this.#pool = new NormalMobPool(this.#scene);
    this.#mobs = [];
  }

  shoot(position) {
    this.spawnMob(position);
  }

  spawnMob(position) {
    const mob = this.#pool.getMob(position);
    this.#mobs.push(mob);
  }
}

