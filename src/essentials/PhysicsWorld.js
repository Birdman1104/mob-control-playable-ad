import * as CANNON from "cannon-es";
import { FD_SEC } from "../configs/constants";
import { GRAVITY } from "../configs/physicsConfig";

export class Physics {
  #world; // CANNON.World

  constructor() {
    this.#world = this.#initWorld();

    this.#world.addEventListener("collide", (event) => {
      const { bodyA, bodyB } = event;
      console.log(bodyA, bodyB);
      // if (bodyA.name === 'playerMob' && bodyB.name === 'enemyMob') {
      //   console.log('Collision detected!');
      //   // Handle collision logic
      // }
    });
  }

  get world() {
    return this.#world;
  }

  update(deltaTime) {
    this.#world.step(FD_SEC, deltaTime, 3);
  }

  addToWorld(body) {
    this.#world.addBody(body);
  }

  removeFromWorld(body) {
    this.#world.removeBody(body);
  }

  #initWorld() {
    const world = new CANNON.World();
    world.broadphase = new CANNON.SAPBroadphase();
    world.allowSleep = true;
    world.gravity.set(0, GRAVITY, 0);
    return world;
  }
}

const PhysicsWorld = new Physics();
export default PhysicsWorld;

