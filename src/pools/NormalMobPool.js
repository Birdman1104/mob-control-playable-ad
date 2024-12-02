import * as CANNON from "cannon-es";
import { Body, Sphere } from "cannon-es";
import * as THREE from "three";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";
import { MODELS } from "../assets";
import { MobsConfig } from "../configs/mobsConfig";
import PhysicsWorld from "../essentials/PhysicsWorld";

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

  getMob() {
    const mob = this.#mobs.find((mob) => !mob.isBorrowed) || this.#addMob();

    mob.isBorrowed = true;
    mob.mesh.visible = true;
    PhysicsWorld.addToWorld(mob.body);

    if (!this.#mobs.includes(mob)) {
      this.#mobs.push(mob);
    }

    PhysicsWorld.addToWorld(mob.body);

    return mob;
  }

  returnMob(mob) {
    mob.mesh.visible = false;
    mob.isBorrowed = false;

    PhysicsWorld.removeFromWorld(mob.body);
  }

  #addMob() {
    const mob = SkeletonUtils.clone(MODELS["mob"]);
    // mob.traverse((node) => {
    //   if (node.isMesh) {
    //     node.material = node.material.clone();
    //     node.frustumCulled = false;
    //     node.visible = true;
    //     node.material.opacity = 1.0;
    //     node.material.side = THREE.DoubleSide; // Render both sides
    //     node.material.needsUpdate = true;
    //     node.renderOrder = 1;
    //     node.layers.set(0);
    //     node.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    //     if (node.skeleton) {
    //       node.skeleton.pose(); // Reset to default pose
    //     }
    //   }
    // });

    mob.castShadow = true;
    mob.receiveShadow = true;
    mob.visible = false;
    this.#scene.add(mob);

    const box = new THREE.BoxHelper(mob, 0xff0000);
    this.#scene.add(box);

    // Physics
    const body = new Body({
      mass: 1,
      shape: new Sphere(0.5),
      position: new CANNON.Vec3(0, 0, 0),
    });

    const { health, attackDelay, speed } = MobsConfig.NormalMob;
    const obj = { mesh: mob, body, isBorrowed: false, health, attackDelay, speed };

    return obj;

    // mixer = new THREE.AnimationMixer(mesh.scene)
    // const action = mixer.clipAction(mesh.animations[0])
    // action.play()
  }
}

