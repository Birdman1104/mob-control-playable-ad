import Ammo from "ammo.js";
import * as THREE from "three";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
import { MODELS } from "../assets";
import { TowerConfig } from "../configs/componentsConfig";
import PhysicsWorld from "../essentials/PhysicsWorld";

export default class Mob extends THREE.Group {
  #model;
  #mesh;
  #scene;
  isBorrowed = false;

  constructor(scene, type, health = 100, attackDelay = 1000, speed = 0.5) {
    super();

    this.#scene = scene;
    this.type = type;
    this.health = health;
    this.attackDelay = attackDelay;
    this.speed = speed;
    this.direction = new THREE.Vector3(100, 100, 0);
    this.target1 = new THREE.Vector3(-10, 0, 0);
    this.#init();
  }

  get mesh() {
    return this.#mesh;
  }

  get model() {
    return this.#model;
  }

  getTargetDestination() {
    if (this.#mesh.position.x < -8) {
      const { x, y, z } = TowerConfig.position;
      return new THREE.Vector3(x, y, z);
    } else {
      return new THREE.Vector3(-8.1, 0, 0);
    }
  }

  activate({ x, y, z }) {
    this.isBorrowed = true;
    this.#model.position.set(x, y, z);
    this.#model.visible = true;
    this.#mesh.position.set(x, y, z);
    this.#mesh.visible = true;

    PhysicsWorld.addPhysicsToMob(this, 1, { friction: 0.7, restitution: 0.5 });

    this.#mesh.userData?.physicsBody?.setLinearVelocity(
      new Ammo.btVector3(Math.sign(this.target1.x) * this.speed, 0, 0)
    );
  }

  deactivate() {
    this.isBorrowed = false;

    this.#model.visible = false;
    this.#mesh.visible = false;

    PhysicsWorld.removePhysicsFromMob(this);
  }

  updatePosition(position) {
    this.#model.position.set(position.x, position.y, position.z);
    this.#mesh.position.set(position.x, position.y + 0.5, position.z);
  }

  #init() {
    this.#initModel();
    this.#initMesh();
  }

  #initModel() {
    this.#model = SkeletonUtils.clone(MODELS[this.type]);
    this.#model.castShadow = true;
    this.#model.receiveShadow = true;
    this.#model.visible = false;
    this.#scene.add(this.#model);
  }

  #initMesh() {
    this.#mesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1, 0.5), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));

    this.#mesh.visible = false;
    this.#scene.add(this.#mesh);
  }
}

