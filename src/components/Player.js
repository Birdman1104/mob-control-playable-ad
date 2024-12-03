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
    // const mob = this.#pool.getMob(position);
    // // mob.body.position.copy(position);
    // // mob.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2);
    // this.#mobs.push(mob);
  }

  update() {
    this.#mobs.forEach(({ mesh }) => {
      // mesh.position.copy(body.position);
      // mesh.quaternion.copy(body.quaternion);
    });
  }
}

