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

  spawnMob(position) {
    const mob = this.#pool.getMob();
    mob.mesh.position.copy(position);
    mob.mesh.visible = true;
    this.#mobs.push(mob);
  }

  update() {
    this.#mobs.forEach(({ mesh, body }) => {
      mesh.position.copy(body.position);
      mesh.quaternion.copy(body.quaternion);
    });
  }
}

