import * as THREE from "three";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
import { MODELS } from "../assets";
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

    this.#init();
  }

  get mesh() {
    return this.#mesh;
  }

  get model() {
    return this.#model;
  }

  activate(position) {
    this.isBorrowed = true;
    this.#model.position.copy(position);
    this.#model.visible = true;
    this.#mesh.position.copy(position);
    this.#mesh.visible = true;

    PhysicsWorld.addPhysicsToMob(this, 1, { friction: 0.7, restitution: 0.5 });
  }

  deactivate() {
    this.isBorrowed = false;

    this.#model.visible = false;
    this.#mesh.visible = false;

    PhysicsWorld.removePhysicsFromMob(this);
  }

  updatePosition(position, quaternion) {
    this.#model.position.set(position.x, position.y, position.z);
    this.#model.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);

    this.#mesh.position.set(position.x, position.y + 0.5, position.z);
    this.#mesh.quaternion.set(quaternion.x, quaternion.y + 0.5, quaternion.z, quaternion.w);
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

